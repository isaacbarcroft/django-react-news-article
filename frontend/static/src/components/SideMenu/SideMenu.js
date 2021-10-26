

function SideMenu(props){

    const sportsLinks = <div><h2>Related Topics</h2>
        <ul>
            <li>
                <a  href="https://www.espn.com/soccer/" target="_blank">ESPN</a>
            </li>
            <li>
                <a href="https://www.goal.com/en-us" target="_blank">GOAL</a>
            </li>
            <li>
                <a href="https://www.cbssports.com/soccer/" target="_blank">CBS</a>
            </li>
        </ul></div> 

    return(
        <>
       {sportsLinks}
        </>
    )
}

export default SideMenu;