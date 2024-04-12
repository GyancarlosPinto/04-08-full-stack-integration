import React from "react";
import TaskList from "../TaskList";
import { indexLists } from "../../helpers/listsFetcher"

export default function Board() {
    const [lists, setLists] = React.useState([]);

    React.useEffect(() => {
        const getListData = async () => {
            const list = await indexLists();
            console.log(list);
            setLists(list);
        }
        getListData();
    }, []);
    
    return (
        <div>
            {lists.map(list => (
                <TaskList tasks={list.tasks}/>
            ))}
        </div>
    )
}