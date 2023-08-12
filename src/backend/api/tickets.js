import { getFirestore, getDoc, doc, setDoc, addDoc, collection, } from 'firebase/firestore'
const db = getFirestore();
export const addTicket = (data) => {
    return new Promise(async (resolve, reject) => {
        const collectionRef = collection(db, "tickets");
        await addDoc(collectionRef, data);
        resolve({ message: "successful" });
    })
}
export const deleteTicket = (id) => {

}

export const moveTicket = (sourceColumn, sourceIndex, destinationColumn, destinationIndex, boardName, boardData) => {
    return new Promise(async (resolve, reject) => {
        let docRef = doc(db, "boards", boardName);
        let source = boardData.tickets[Number(sourceColumn)][Object.keys(boardData.tickets[Number(sourceColumn)])[0]];
        let destination = boardData.tickets[Number(destinationColumn)][Object.keys(boardData.tickets[Number(destinationColumn)])[0]];
        const moveData = source[sourceIndex];
        source.splice(Number(sourceIndex), 1);
        destination.splice(Number(destinationIndex), 0, moveData);
        boardData.tickets[sourceColumn] = { [Object.keys(boardData.tickets[Number(sourceColumn)])[0]]: source };
        boardData.tickets[destinationColumn] = { [Object.keys(boardData.tickets[Number(destinationColumn)])[0]]: destination };
        console.log(boardData);
        await setDoc(docRef, { tickets: boardData.tickets }, { merge: true });
        docRef=doc(db,`boards/elaichi/tickets`,moveData.split("+")[0]);
        await setDoc(docRef,{status:Object.keys(boardData.tickets[Number(destinationColumn)])[0]},{merge:true});
        resolve({ message: "success" })
    })
}
export const getTicket = (id) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "tickets", id);
        const ticket = await getDoc(docRef);
        resolve(ticket.data());
    })
}