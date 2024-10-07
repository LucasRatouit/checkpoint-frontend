import { gql, useMutation, useQuery } from "@apollo/client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { useEffect, useState } from "react";

const GET_CONTINENTS = gql`
  query Continents {
    continents {
      id
      name
    }
  }
`;

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      id
    }
  }
`;

const AddCountryForm = (props: {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  request: any;
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const { data: dataContinents } = useQuery(GET_CONTINENTS);
  const [addCountry] = useMutation(ADD_COUNTRY, {
    refetchQueries: props.request,
  });

  useEffect(() => {
    if (selectedContinent) {
      console.log(selectedContinent);
    }
  }, [selectedContinent]);

  return (
    <Dialog open={props.isDialogOpen} onOpenChange={props.setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Country</DialogTitle>
          <DialogDescription>Add a new country</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (data) => {
            console.log(data);
            if (selectedContinent) {
              data = {
                ...data,
                continent: {
                  id: parseInt(selectedContinent),
                },
              };
            } else {
              data = {
                ...data,
              };
            }
            await addCountry({ variables: { data } });
            await props.setIsDialogOpen(false);
            await reset();
          })}
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input {...register("name", { required: true })} id="name" />
            <Label htmlFor="code">Code</Label>
            <Input {...register("code", { required: true })} id="code" />
            <Label htmlFor="emoji">Emoji</Label>
            <Input {...register("emoji", { required: true })} id="emoji" />
            <Label htmlFor="continent">Continent</Label>
            <Select
              value={selectedContinent}
              onValueChange={setSelectedContinent}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a continent" />
              </SelectTrigger>
              <SelectContent>
                {dataContinents?.continents.map((continent: Continent) => (
                  <SelectItem
                    className="bg-white"
                    key={continent.id}
                    value={continent.id.toString()}
                  >
                    {continent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCountryForm;
