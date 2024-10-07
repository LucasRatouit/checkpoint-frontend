import { gql, useQuery } from "@apollo/client";
import { Button } from "./ui/button";
import { useState } from "react";
import AddCountryForm from "./AddCountryForm";

const GET_COUNTRIES = gql`
  query Countries {
    countries {
      id
      name
      emoji
      code
    }
  }
`;

const CountriesList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data } = useQuery(GET_COUNTRIES);

  return (
    <div>
      <div className="flex justify-center py-2">
        <Button onClick={() => setIsDialogOpen(true)}>Add Country</Button>
      </div>

      <div className="h-screen w-9/12 flex flex-wrap place-content-start items-center justify-center gap-x-16 gap-y-0 mx-auto">
        {data?.countries.map((country: Country) => (
          <div
            key={country.id}
            className="hover:bg-neutral-300 max-h-min px-2 py-1 flex flex-col items-center rounded-lg cursor-pointer"
            onClick={() => (window.location.href = `/${country.code}`)}
          >
            <span className="text-7xl">{country.emoji}</span>
            <span>
              Name : {country.name} ({country.code})
            </span>
          </div>
        ))}
      </div>
      <AddCountryForm
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        request={[{ query: GET_COUNTRIES }]}
      />
    </div>
  );
};

export default CountriesList;
