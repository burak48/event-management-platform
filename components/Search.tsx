import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Dispatch, SetStateAction, useState } from "react";

interface SearchProps {
    setQuery: Dispatch<SetStateAction<string>>;
}

export function Search({ setQuery }: SearchProps): JSX.Element {
  const [query, setLocalQuery] = useState("");

  const handleSearch = async () => {
    setQuery(query);
  };

  return (
    <div className="flex w-full items-center space-x-2 max-w-2xl mb-4">
      <Input
        type="text"
        placeholder="Find the event"
        value={query}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      <Button type="button" variant="default" size="default" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}
