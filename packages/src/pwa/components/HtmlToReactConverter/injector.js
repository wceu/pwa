/* eslint no-bitwise: ["error", { "int32Hint": true }] */
import he from 'he';

const MIN_LIMIT_VALUE = 300;
const MIN_LENGTH = 133;
const OFFSET = MIN_LIMIT_VALUE;

// TODO - change these to a functions that return the value?
const IMG_VALUE = 120;
const BLOCKQUOTE_VALUE = 120;
const LI_VALUE = 50;

const validElements = ['p', 'blockquote', 'ul', 'ol'];

const insertAfter = (newChild, refChild, children) => {
  if (!newChild) return;
  children.splice(children.indexOf(refChild) + 1, 0, newChild);
};

const insertionPoints = htmlTree => {
  const points = [];
  const valueInsertions = element => {
    if (element.type === 'Text') {
      return he.decode(element.content.replace(/\s/g, '')).length;
    } else if (element.tagName === 'img' || element.tagName === 'iframe') {
      return IMG_VALUE;
    } else if (element.tagName === 'blockquote') {
      return BLOCKQUOTE_VALUE;
    } else if (element.tagName === 'li') {
      return LI_VALUE;
    } else if (element.children && element.children.length > 0) {
      return element.children.reduce((sum, child) => {
        let value = valueInsertions(child);
        const newSum = sum + value;
        if (validElements.includes(child.tagName)) {
          if (value < MIN_LENGTH) {
            const whastePoint = points.pop();
            value += whastePoint ? whastePoint.value : 0;
          }
          points.push({ parent: element, child, value });
        }
        return newSum;
      }, 0);
    }

    return 0;
  };

  let htmlRoot;
  if (htmlTree.length > 1) {
    htmlRoot = { children: htmlTree };
  } else if (htmlTree.length === 1) {
    [htmlRoot] = htmlTree;
  } else {
    return points;
  }

  valueInsertions(htmlRoot);
  return points;
};

// elementsToInject is an array with the following structure:
//
// [
//   {
//     position: 0,
//     element: React.Element,
//   },
//   {
//     position: 1,
//     doNotPlaceAtTheEnd: true,
//     element: React.Element,
//   },
//   ...
// ];
export default function injector({ htmlTree, elementsToInject }) {
  const points = insertionPoints(htmlTree);
  const [lastPoint] = points.slice(-1);

  const totalValue = points.reduce((last, point) => last + point.value, 0);
  const lastInjectableIndex = elementsToInject.reduce(
    (last, { position }) => Math.max(last, position),
    0,
  );
  const limitValue = Math.max(MIN_LIMIT_VALUE, Math.floor(totalValue / (lastInjectableIndex + 1)));

  // Place the very first element (or elements)
  const atTheBeginning = elementsToInject.filter(({ position }) => position === 0);
  if (atTheBeginning.length) htmlTree.splice(0, 0, atTheBeginning.map(({ element }) => element));

  let sum = !atTheBeginning.length ? OFFSET : 0;
  let position = 0;

  points.forEach(point => {
    const { parent, child, value } = point;
    sum += value;

    if (sum >= limitValue) {
      position += 1;
      sum = 0;

      const { children } = parent;
      const injectable = elementsToInject.filter(toInject => toInject.position === position);

      if (injectable.length) {
        injectable.forEach(({ element, doNotPlaceAtTheEnd }) => {
          if (!(point === lastPoint && doNotPlaceAtTheEnd)) insertAfter(element, child, children);
        });
      }
    }
  });
}
