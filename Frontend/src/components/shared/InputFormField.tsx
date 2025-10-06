import type { InputFieldProps } from "@/utils/Constant"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"


const InputFormField = ({control,name,placeholder,label,type,disable}:InputFieldProps) => {
  return (
    <div>
      <FormField control={control} name={name} render={({field})=>{
        return(
            <FormItem>
                <FormLabel className="py-2" style={{fontSize:16}}>{label}</FormLabel>
                <FormControl>
                    <Input placeholder={placeholder} {...field} autoComplete="off" type={type} disabled={disable}/>
                </FormControl>
                <FormMessage />
            </FormItem>
        )
      }}/>
    </div>
  )
}

export default InputFormField
