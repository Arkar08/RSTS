import { TableHead, TableHeader, TableRow } from '../ui/table'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableHeading = ({headers}:any) => {
  return (
    <TableHeader>
      <TableRow className='h-[60px]'>
        {
          headers.map((header:string)=>{
            return(
                <TableHead className='px-3 text-center' style={{fontSize:16}} key={header}>{header}</TableHead>
            )
          })
        }
      </TableRow>
    </TableHeader>
  )
}

export default TableHeading
