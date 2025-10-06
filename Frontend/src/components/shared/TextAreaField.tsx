import type { InputFieldProps } from "@/utils/Constant"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"


const TextAreaField = ({control,name,placeholder,label}:InputFieldProps) => {
  return (
    <div>
      <FormField control={control} name={name} render={({field})=>{
        return(
            <FormItem>
                <FormLabel className="py-2" style={{fontSize:16}}>{label}</FormLabel>
                <FormControl>
                    <Textarea placeholder={placeholder} {...field} autoComplete="off"/>
                </FormControl>
                <FormMessage />
            </FormItem>
        )
      }}/>
    </div>
  )
}

export default TextAreaField
