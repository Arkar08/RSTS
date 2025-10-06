import type { SelectFormFieldProps } from "@/utils/Constant";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SelectFormField = ({control,name,placeholder,label,categoryList}:SelectFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="py-2" style={{fontSize:16}}>{label}</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value ?? ""}
            >
              <FormControl>
                <SelectTrigger className="w-[100%]  cursor-pointer py-4">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[220px] h-[100%] overflow-y-auto">
                {
                  categoryList?.map((category)=>{
                    return (
                        <SelectItem value={category._id} className="cursor-pointer h-[40px]" key={category._id}>{category.name}</SelectItem>
                    )
                  })
                }
                
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default SelectFormField;
