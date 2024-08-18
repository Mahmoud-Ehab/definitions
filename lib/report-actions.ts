'use server';

import { auth } from '@/auth';

import { getDB } from '@/lib/db';
import { Word, Definition, Example, Mention } from '@/lib/types';
import { z } from 'zod';

const reportSchema = z.object({
  word_text: z.string().min(2).max(50),
  report_element: z.string(),
  element_id: z.string(),
});

export async function Report(_: State, formData: FormData) {
  const valFields = reportSchema.safeParse({
    word_text: formData.get('word_text'),
    report_element: formData.get('report_element'),
    element_id: formData.get('element_id'),
  });

  const session = await auth();
  if (!session?.user) {
    return {
      message: { text: 'You have to login in order to report items.', type: 'error' },
    };
  }

  if (!valFields.success) {
    return {
      message: { text: 'Error submitting the form!', type: 'error' },
      errors: valFields.error.flatten().fieldErrors,
    };
  }

  try {
    const sf = (await getDB()).get(valFields.data.word_text.slice(0, 2));
    const index = sf.getIndexOf((word) => (word as Word).text === valFields.data.word_text)[0];
    // ensure that the word does exist
    if (index === undefined) {
      return {
        message: { text: 'Cannot find the word: ' + valFields.data.word_text, type: 'error' },
      };
    }
    let word = sf.get(index);
    // ensure that the form has been submitted with valid values
    const { report_element, element_id } = valFields.data;
    if (!['word', 'definition', 'example', 'mention'].includes(report_element)) {
      return { message: { text: 'Invalid input!', type: 'error' } };
    }
    // ensure that the user didn't report the same element before
    for (let report of word.reports) {
      if (
        report.reporter === session.user.email &&
        report.reportee === report_element + '_' + element_id
      ) {
        return { message: { text: 'You have already reported this item.' } };
      }
    }
    // report the element
    word = reportElement(word, report_element, element_id, session.user.email);
    if (!word.text) sf.remove(index);
    else sf.update(index, () => word);
    return {
      message: {
        text: 'Done. Thanks for reporting.',
        type: 'success',
      },
    };
  } catch (err) {
    console.error(Date().split(' ')[4], ': ', err);
    return {
      message: { text: 'Something went wrong!', type: 'error' },
    };
  }
}

export async function Dereport(_: State, formData: FormData) {
  const valFields = reportSchema.safeParse({
    word_text: formData.get('word_text'),
    report_element: formData.get('report_element'),
    element_id: formData.get('element_id'),
  });

  const session = await auth();
  if (!session?.user) {
    return {
      message: { text: 'You have to login in order to report items.', type: 'error' },
    };
  }

  if (!valFields.success) {
    return {
      message: { text: 'Error submitting the form!', type: 'error' },
      errors: valFields.error.flatten().fieldErrors,
    };
  }

  try {
    const sf = (await getDB()).get(valFields.data.word_text.slice(0, 2));
    const index = sf.getIndexOf((word) => (word as Word).text === valFields.data.word_text)[0];
    // ensure that the word does exist
    if (index === undefined) {
      return {
        message: { text: 'Cannot find the word: ' + valFields.data.word_text, type: 'error' },
      };
    }
    let word = sf.get(index);
    // ensure that the form has been submitted with valid values
    const { report_element, element_id } = valFields.data;
    if (!['word', 'definition', 'example', 'mention'].includes(report_element)) {
      return { message: { text: 'Invalid input!', type: 'error' } };
    }
    // dereport the element
    word = dereportElement(word, report_element, element_id, session.user.email);
    sf.update(index, () => word);
    return {
      message: {
        text: 'Your report has been removed.',
        type: 'success',
      },
    };
  } catch (err) {
    return {
      message: { text: err.message || 'Something went wrong!', type: 'error' },
    };
  }
}

type Element = {
  type: 'word' | 'definition' | 'example' | 'mention';
  id: string; // it could be definition reference, example text, or mention hyperlink.
};

// map from element type to its id attribute
const identifiers = {
  word: 'text',
  definition: 'reference',
  example: 'text',
  mention: 'hyperlink',
};

function reportElement(
  word: Word,
  element_type: string,
  element_id: string,
  reporter: string,
): Word {
  word.reports.push({
    reporter,
    reportee: `${element_type}_${element_id}`,
    date: Date(),
  });
  if (element_type === 'word') {
    word.NV += 2;
    return word.NV >= word.V ? {} : word;
  } else if (element_type === 'definition') {
    const i = word.definitions.findIndex(
      (def) =>
        element_type + '_' + def[identifiers[element_type]] === `${element_type}_${element_id}`,
    );
    if (!word.definitions[i]) throw Error('Probably the item has already been deleted.');
    word.definitions[i].NV += 2;
    if (word.definitions[i].NV >= word.definitions[i].V) {
      word.definitions.splice(i, 1);
    }
    return word;
  } else if (element_type == 'example') {
    const i = word.examples.findIndex(
      (exam) =>
        element_type + '_' + exam[identifiers[element_type]] === `${element_type}_${element_id}`,
    );
    if (!word.examples[i]) throw Error('Probably the item has already been deleted.');
    word.examples[i].NV += 2;
    if (word.examples[i].NV >= word.examples[i].V) {
      word.examples.splice(i, 1);
    }
    return word;
  } else if (element_type == 'mention') {
    const i = word.mentions.findIndex(
      (mention) =>
        element_type + '_' + mention[identifiers[element_type]] === `${element_type}_${element_id}`,
    );
    if (!word.mentions[i]) throw Error('Probably the item has already been deleted.');
    word.mentions[i].NV += 2;
    if (word.mentions[i].NV >= word.mentions[i].V) {
      word.mentions.splice(i, 1);
    }
    return word;
  } else {
    throw Error('reportElement Error: invalid usage!');
  }
}

function dereportElement(
  word: Word,
  element_type: string,
  element_id: string,
  reporter: string,
): Word {
  const filtered = word.reports.filter(
    (rep) => !(rep.reporter === reporter && rep.reportee === `${element_type}_${element_id}`),
  );
  if (filtered.length === word.reports.length) {
    throw Error('dereportElement Error: no report found to remove!');
  }
  word.reports = filtered;
  if (element_type === 'word') {
    if (word.NV > 0) word.NV -= 2;
    return word;
  } else if (element_type === 'definition') {
    const i = word.definitions.findIndex(
      (def) =>
        element_type + '_' + def[identifiers[element_type]] === `${element_type}_${element_id}`,
    );
    if (!word.definitions[i]) throw Error('Probably the item has already been deleted.');
    if (word.definitions[i].NV > 0) word.definitions[i].NV -= 2;
    return word;
  } else if (element_type == 'example') {
    const i = word.examples.findIndex(
      (exam) =>
        element_type + '_' + exam[identifiers[element_type]] === `${element_type}_${element_id}`,
    );
    if (!word.examples[i]) throw Error('Probably the item has already been deleted.');
    if (word.examples[i].NV > 0) word.examples[i].NV -= 2;
    return word;
  } else if (element_type == 'mention') {
    const i = word.mentions.findIndex(
      (mention) =>
        element_type + '_' + mention[identifiers[element_type]] === `${element_type}_${element_id}`,
    );
    if (!word.mentions[i]) throw Error('Probably the item has already been deleted.');
    if (word.mentions[i].NV > 0) word.mentions[i].NV -= 2;
    return word;
  } else {
    throw Error('dereportElement Error: invalid usage!');
  }
}
