import { Button } from "@/components/ui/button";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const GET_COUNTRY = gql`
  query Country($code: String!) {
    country(code: $code) {
      id
      name
      emoji
      code
      continent {
        name
      }
    }
  }
`;

const Country = () => {
  const code = useRouter().query.id as string;
  const { data } = useQuery(GET_COUNTRY, { variables: { code: code } });

  return (
    <div className="max-h-min text-xl flex flex-col items-center relative">
      <span className="text-9xl">{data?.country.emoji}</span>
      <span>
        Name : {data?.country.name} ({data?.country.code})
      </span>
      {data?.country.continent?.name && (
        <span>Continent : {data?.country.continent.name}</span>
      )}
      <Button
        className="absolute left-6 top-6"
        onClick={() => window.history.back()}
      >
        {"<"}-- Back
      </Button>
    </div>
  );
};

export default Country;
