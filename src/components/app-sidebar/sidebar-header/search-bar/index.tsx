import { assets } from "@/constants";
import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";
import { featureList } from "./data";
import sanitizeText from "@/lib/sanitize-text";
import SearchedResults from "./searched-results";

export default React.memo(function Searchbar() {
  const [text, setText] = React.useState("");
	const { navigate } = useCustomNavigation();
	 const searchbarRef = React.useRef<HTMLDivElement>(null);


	  React.useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          searchbarRef.current &&
          !searchbarRef.current.contains(event.target as Node)
        ) {
          setText(""); // Reset search input
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);
	
	
  const results = React.useMemo(() => {
    const sanitizedInput = sanitizeText(text).split("-").join(" ");

    if (!sanitizedInput) return [];

    const filteredList = featureList.filter(
      (item) =>
        sanitizeText(item.name).includes(sanitizedInput) ||
        item.tags?.some((tag) => sanitizeText(tag).includes(sanitizedInput)),
    );

    return filteredList;
  }, [text]);

  const action = (path: string) => {
    navigate(path);
    setText("");
  };

  return (
    <div ref={searchbarRef} className="relative hidden lg:block">
      <div className="flex items-center gap-3 rounded-md border border-primary px-3 py-2">
        <img src={assets.search_icon_01} alt="search icon" />
        <input
          type="search"
          name="search"
          placeholder="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="outline-none placeholder:text-primary"
        />
      </div>

      <SearchedResults data={results} action={action} />
    </div>
  );
});

