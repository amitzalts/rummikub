function renderPageHeader(user: any){
    try {
      const headerRoot: HTMLDivElement | null  = document.querySelector("#headerRoot")
      if(!headerRoot) throw new Error ("headerRoot not found on DOM")
      
      headerRoot.innerText = `${user.userName} welcome to user profile page`

    } catch (error) {
       console.error(error) 
    }
}

function renderpersonalDetailsBar(){
  try {
    const personalDetailsRoot: HTMLDivElement | null  = document.querySelector("#personalDetailsRoot")
    if(!personalDetailsRoot) throw new Error ("personalDetailsRoot not found on DOM")

    personalDetailsRoot.innerHTML=`
      <div>hello</div>
    `

  } catch (error) {
    console.error(error)
  }
}