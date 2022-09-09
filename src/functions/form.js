
import uploader from "./uploader";



const handle_upload = async (e,actions,display,prev_file,more_files,fields) =>{
    actions.reset()
    e.preventDefault();
    try {
    actions.isPending(true);
    display()
    if(!prev_file.length || !more_files.length)return actions.isFailed()
    await uploader({...fields,prev_file,more_files})
    actions.isSuccessful()
    } catch (error) {
      return  actions.isFailed();
    }
}

export { handle_upload}