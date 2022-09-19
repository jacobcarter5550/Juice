import Head from 'next/head'
import styles from '../styles/Home.module.css'
import DAO from '../components/DAO'
import DAOMobile from '../components/DAOMobile'
import Background from '../components/Background'
import {isMobile} from 'react-device-detect'
import Tester from '../components/Tester'

export default function Home() {
  return (
    <div className={styles.container}>
      <Tester/>
      <Head>
        <title>Orange Dash</title>
        <meta name="description" content="Created for OrangeDAO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isMobile ? <>
        <DAO />
        <Background />
      </>
      :
      <>
        <DAOMobile />
        <Background />
      </>}
    </div>
  )
}
