import patcher from '@core/patcher';
import utilities from '@utilities';
import logger from '@core/logger';

const { lazyDefine, findReact, name } = utilities;

function handler() {
    const tableNode = document.querySelector('[class*="_Table_"]');

    if (!tableNode) return;

    const Table = findReact(tableNode);

    if (!Table) return logger.debug('Failed to find React Fiber of LB Table:', Table);

    patcher.before('type', Table, (args) => {
      const users: unknown = args?.[0]?.users;

      if (Array.isArray(users)) {
        const user = users.find(user => user?.isCurrentUser && typeof user?.firstName === 'string');
        user.firstName = name.firstName;
      }
    });
}

export default async function () {
  const page = await lazyDefine(() => document.querySelector('[id="root"]'), undefined, Infinity);

  const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => mutation.type === 'childList' && handler());
  });

  observer.observe(page, { childList: true, subtree: true });
  return () => observer.disconnect();
}
