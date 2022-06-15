import { useProseMirror } from "use-prosemirror";
import { EditorState, Transaction } from "prosemirror-state";


export interface WysiwygCallbackMap {
  [name: string]: (state: EditorState<any>) => void;
}

export const useWysiwyg = (
  opts: Parameters<typeof useProseMirror>[0],
  viewRef: React.MutableRefObject<null>,
  callbacks?: WysiwygCallbackMap
): [
  EditorState<any>,
  (tr: Transaction) => void,
  (state: EditorState<any>) => void
] => {
  let [state, setState] = useProseMirror(opts);

  const dispatch = (tr: Transaction) => {
    const needClearView = tr.getMeta("clearView");
    // reset editor state (for example, for messengers)
    if (needClearView && viewRef.current) {
      // @ts-ignore
      const newState = EditorState.create({
        schema: opts.schema,
        plugins: opts.plugins,
      });
      setState(newState);
      return;
    }
    if (callbacks) {
      // call "onChange" function (if any) each time state changes
      callbacks.onChange && callbacks.onChange(state);
      // other callbacks need to be added in transaction "meta" (callbackName: true)
      Object.keys(callbacks).forEach((name: string) => {
        const isCallbackFired = tr.getMeta(name);
        isCallbackFired && callbacks[name](state);
      });
    }
    // setState(state.apply(tr));
    if (tr.getMeta("addNewNode")) {
      setState(state.apply(tr));
    } else {
      // @ts-ignore
      setState(viewRef.current?.view.state.apply(tr) || state.apply(tr));
    }
    // console.log("transaction: ", tr);
    // //@ts-ignore
    // if (viewRef.current && viewRef.current.view) {
    //   // @ts-ignore
    //   console.log("inside set state: ", viewRef.current.view.state === state);
    //   // @ts-ignore
    //   setState(viewRef.current.view.state.apply(tr));
    // } else {
    //   setState(state.apply(tr));
    // }
  };

  return [state, dispatch, setState];
};
