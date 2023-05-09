function renderPageHeader(user: any){
    try {
      const headerRoot: HTMLDivElement | null  = document.querySelector("#headerRoot")
      if(!headerRoot) throw new Error ("headerRoot not found on DOM")
      
      headerRoot.innerText = `${user.userName} welcome to user profile page`

    } catch (error) {
       console.error(error) 
    }
}