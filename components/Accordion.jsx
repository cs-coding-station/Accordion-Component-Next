"use client";
import { ChevronDown } from "lucide-react";
import classname from "classname";
import { useState } from "react";
import { useImmer } from "use-immer";

export default function Accordion({ items }) {
  const list = items.map((listItem, idx) => {
    return { ...listItem, open: false, idx: idx };
  });

  //   const [accordion, setAccordion] = useState(list);
  const [accordion, setAccordion] = useImmer(list);

  function openOrClose(item) {
    // setAccordion(
    //   accordion.map((listItem) => {
    //     if (item.idx === listItem.idx)
    //       return {
    //         ...listItem,
    //         open: !listItem.open,
    //       };

    //     return listItem;
    //   })
    // );
    setAccordion((draft) => {
      const draftItem = draft.find((a) => item.idx === a.idx);
      draftItem.open = !draftItem.open;
    });
  }

  function questionBorder(idx, item, list) {
    if (idx < list.length - 1 && !item.open) return true;
    return false;
  }

  return (
    <div>
      {accordion.map((item, idx) => (
        <div key={idx}>
          <h2>
            <button
              type="button"
              onClick={() => openOrClose(item)}
              className={classname(
                "flex w-full items-center justify-between border border-gray-200 bg-white p-5 font-medium text-gray-500 hover:bg-gray-100",
                {
                  "rounded-t-xl": idx === 0,
                  "bg-gray-200": item.open,
                  "border-b-0": questionBorder(idx, item, list),
                }
              )}
            >
              <span>{item.title}</span>
              <ChevronDown
                size={24}
                className={classname("transition-transform duration-200", {
                  "rotate-180": item.open,
                })}
              />
            </button>
          </h2>

          <div className={classname("bg-white", { hidden: !item.open })}>
            <div
              className={classname("border border-t-0 border-gray-200 p-5", {
                "border-b-0": idx < list.length - 1,
              })}
            >
              <p className="text-gray-500">{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
