import styles from '../styles/Master.module.scss'
import {tryDeepDao} from '../lib/api'

function Tester() {

    async function tryDeep() {
        // const  res = await tryDeepDao()
        // console.log(res)
        console.log(localStorage.getItem('blackList'))
        console.log(localStorage.getItem('whiteList'))
        
    }

    async function tryStorage (){
      localStorage.setItem('blackList', JSON.stringify([]))
      localStorage.setItem('whiteList', JSON.stringify([]))
    }

  return (
    <div className={styles.testingModal}>
        <button onClick={()=>{tryDeep()}}>try me</button>
        <button onClick={()=>{tryStorage()}}>try stoarage</button>
    </div>
  )
}

export default Tester