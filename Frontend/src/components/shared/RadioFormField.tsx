import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RadioFormField = ({control,name}:any) => {
  return (
    <div>
      <FormField control={control} name={name} render={({field })=>{
        return(
            <FormItem>
                <FormLabel className="py-2" style={{fontSize:16}}>Choose Product Type</FormLabel>
                <FormControl>
                    <RadioGroup value={field.value} onValueChange={field.onChange} className=" mt-3 flex">
                        <FormItem className="flex items-center gap-3">
                            <FormControl className="cursor-pointer">
                                <RadioGroupItem value="pickUp Product"/>
                            </FormControl>
                            <FormLabel className="font-normal">
                                PickUp Product
                            </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                            <FormControl className="cursor-pointer">
                                <RadioGroupItem value="delivered Product"/>
                            </FormControl>
                            <FormLabel className="font-normal">
                                Delivered Product
                            </FormLabel>
                        </FormItem>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
            </FormItem>
        )
      }}>

      </FormField>
    </div>
  )
}

export default RadioFormField
