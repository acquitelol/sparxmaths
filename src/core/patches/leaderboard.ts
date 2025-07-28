import patcher from '@core/patcher';
import utilities from '@utilities';

const { lazyDefine, findReact, name } = utilities;

export default async function () {
  const tableNode = await lazyDefine(() =>
    document.querySelector('[class*="_Table_"]'),
  );

  const Table = findReact(tableNode);

  const unpatch = patcher.before('type', Table, (args) => {
    const users: unknown = args?.[0]?.users;

    if (Array.isArray(users)) {
      users.find(user => user?.isCurrentUser).firstName = name.firstName;
    }
  });

  return unpatch;
}
