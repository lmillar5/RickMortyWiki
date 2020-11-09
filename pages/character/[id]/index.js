import Link from 'next/link';
import Head from 'next/head'
import styles from '../../../styles/Home.module.css'
const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

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

export default function Character({data}) {
const {name, image, gender, location, origin, species, status, episode} = data;
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
	  		<li><a href="/episode">Episodes</a></li>
	  	</ul>
	   </nav>
	  </header>
      <main className={styles.main}>
        <h1 className={styles.title}>
          	Rickticktavi B**ch!
        </h1>

        <h2 className={styles.subtitle}>
          	All you need to know about:
	  	</h2>
	  		
	<div className={styles.profile}>
      <div className={styles.profileImage}>
      <img src={image} alt={name} />
    </div>
    <div className={styles.profileDetails}>
    <h3>{name}</h3>
    <ul>
      <li>
        <strong>Status:</strong> { status }
      </li>
      <li>
        <strong>Gender:</strong> { gender }
      </li>
      <li>
        <strong>Species:</strong> { species }
      </li>
      <li>
        <strong>Location:</strong> { location?.name }
      </li>
      <li>
        <strong>Originally From:</strong> { origin?.name }
      </li>
    </ul>
  </div>
</div>
		<p>
			<Link href="/">
				
					<button type="button" className={styles.menu}><a>Back to All Characters</a></button>
			</Link>
		</p>
      </main>

      <footer className={styles.footer}>
        <a href="https://www.iamleanne.co.uk" target="_blank">Developed by Leanne Millar BSc.</a>
      </footer>
    </div>
  )
}
