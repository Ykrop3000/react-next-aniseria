import React from 'react'
import {FormControl,Select,MenuItem } from '@material-ui/core'
import { useRouter } from 'next/router'


export default function SecondaryFilter({data=[], active={}, multiple=false, name='order'}){
    const [selected, setSelect] = React.useState(active);
    const isFirstRun = React.useRef(true);

    const router = useRouter()

    const handleChange = (event) => {
         setSelect(event.target.value)
    };

 
    React.useEffect(() => {

        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        const params = Object.assign({},router.query,
            {
                [name]: multiple ? selected.map(s => s.id).join(',') : selected.id
            }
        )
     
        router.push({ query: params });
 
    }, [selected]);
    


    return (
        <FormControl>
            <Select

            value={selected}
            onChange={handleChange}
            multiple={multiple}
            renderValue={(select) => select.text}
            >


                {data.map((element) => (
                    <MenuItem key={element.id} value={element}>{element.text}</MenuItem>
                ))}

            </Select>
        </FormControl>

    )
}