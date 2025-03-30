import { createSelector } from 'reselect';

const selectCrud = (state) => state.crud;

export const selectCurrentItem = createSelector(
  [selectCrud],
  (adavancedCrud) => adavancedCrud.current
);

export const selectListItems = createSelector([selectCrud], (adavancedCrud) => adavancedCrud.list);
export const selectItemById = (itemId) =>
  createSelector(selectListItems, (list) => list.result.items.find((item) => item._id === itemId));

export const selectCreatedItem = createSelector(
  [selectCrud],
  (adavancedCrud) => adavancedCrud.create
);

export const selectUpdatedItem = createSelector(
  [selectCrud],
  (adavancedCrud) => adavancedCrud.update
);

export const selectReadItem = createSelector([selectCrud], (adavancedCrud) => adavancedCrud.read);

export const selectDeletedItem = createSelector(
  [selectCrud],
  (adavancedCrud) => adavancedCrud.delete
);

export const selectSearchedItems = createSelector(
  [selectCrud],
  (adavancedCrud) => adavancedCrud.search
);
export const selectMailItem = createSelector([selectCrud], (adavancedCrud) => adavancedCrud.mail);
