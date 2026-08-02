import * as React from 'react';

export interface ElementSize {
  width: number;
  height: number;
}

/**
 * Measures an element's live rendered box via ResizeObserver — for shapes
 * whose wobble geometry depends on their actual size. Merges with a
 * forwarded ref so the component using this hook can still expose its DOM
 * node to callers.
 *
 * The node is tracked in state, not a plain ref, so the observer re-attaches
 * whenever the element mounts. That matters for anything rendered lazily —
 * Modal's `Dialog.Popup` only exists once the dialog opens, long after the
 * component using this hook first mounted, so a mount-only effect would
 * never see it and the shape would silently never render.
 */
export function useElementSize<T extends HTMLElement>(
  forwardedRef?: React.Ref<T>,
): [React.RefCallback<T>, ElementSize] {
  const [node, setNode] = React.useState<T | null>(null);
  const [size, setSize] = React.useState<ElementSize>({ width: 0, height: 0 });

  React.useLayoutEffect(() => {
    if (!node) return;
    const measure = () => setSize({ width: node.clientWidth, height: node.clientHeight });
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    measure();
    return () => observer.disconnect();
  }, [node]);

  const setRef = React.useCallback(
    (el: T | null) => {
      setNode(el);
      if (typeof forwardedRef === 'function') forwardedRef(el);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<T | null>).current = el;
    },
    [forwardedRef],
  );

  return [setRef, size];
}
