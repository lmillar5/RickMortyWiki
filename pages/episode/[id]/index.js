import Link from 'next/link';
import Head from 'next/head'
import styles from '../../../styles/Home.module.css'
const defaultEndpoint = `https://rickandmortyapi.com/api/episode/`;

export async function getServerSideProps({query}) {
const {id} = query;
const res = await fetch(`${defaultEndpoint}/${id}`);
const data = await res.json();
return {
	props: {
		data
		}
	}
}

export default function Episode({data}) {
const {id, name, episode, air_date, characters} = data;
return (
    <div className={styles.container}>
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
	  <header>
		<nav className={styles.menu}>
	  	<ul>
	  		<li><a href="/">Characters</a></li>
	  		<li><a href="../">Episodes</a></li>
	  	</ul>
	   </nav>
	  </header>
      <main className={styles.main}>
        <h1 className={styles.title}>
          	Rickticktavi B**ch!
        </h1>

        <h2 className={styles.subtitle}>
          	All you need to know about {episode}
	  	</h2>

    <ul>
	  <li>
        <strong>Episode name:</strong> { name }
      </li>
      <li>
        <strong>First aired:</strong> { air_date }
      </li>
      <li>
        <strong>Characters:</strong> { characters?.name}
      </li>
    </ul>
		<p>
			<Link href="/episode">
				
					<button type="button" className={styles.menu}><a>Back to all episodes</a></button>
			</Link>
		</p>
      </main>

      <footer className={styles.footer}>
        <a href="https://www.iamleanne.co.uk" target="_blank">Developed by Leanne Millar BSc.</a>
      </footer>
    </div>
  )
}
