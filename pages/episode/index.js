import Link from 'next/link';
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import React, { useState, useEffect } from 'react'; 
const defaultEndpoint = `https://rickandmortyapi.com/api/episode/`; 

export async function getServerSideProps() { 
  const res = await fetch(defaultEndpoint)  
  const data = await res.json();  
  return {
    props: { 
      data
    }
  }
}

export default function Episode({ data }) {
	const { info, results: defaultResults = [] } = data; 
    const [results, updateResults] = useState(defaultResults); 
	const [page, updatePage] = useState({
    ...info,
    current: defaultEndpoint
  }); 

	const { current } = page;

	useEffect(() => {
	  if ( current === defaultEndpoint ) return;

	  async function request() {
		const res = await fetch(current)
		const nextData = await res.json();

		updatePage({
		  current,
		  ...nextData.info
		});

		if ( !nextData.info?.prev ) {
		  updateResults(nextData.results);
		  return;
		}

		updateResults(prev => {
		  return [
			...prev,
			...nextData.results
		  ]
		});
	  }

	  request();
	}, [current]);
		
	function handleLoadMore() {
	  updatePage(prev => {
		return {
		  ...prev,
		  current: page?.next
		}
	  });
	}
			
	function handleOnSubmitSearch(e) {
  e.preventDefault();

  const { currentTarget = {} } = e;
  const fields = Array.from(currentTarget?.elements);
  const fieldQuery = fields.find(field => field.name === 'query');

  const value = fieldQuery.value || '';
  const endpoint = `https://rickandmortyapi.com/api/episode/?name=${value}`;


  updatePage({
    current: endpoint
  });
}		
  return (
    <div className={styles.container}>
      <Head>
        <title>Rick and Morty Episodes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
	  <header>
		<nav className={styles.menu}>
	  	<ul>
	  		<li><a href="/">Characters</a></li>
	  		<li><a href="#">Episodes</a></li>
	  	</ul>
	    </nav>
	  </header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          	Rickticktavi B**ch!
        </h1>

        <h2 className={styles.subtitle}>
          	The seasonography.
	  	</h2>
	  
	  	<p className={styles.description}>	
	  		All about the Rick and Morty episodes.
        </p>
			
		<form className="search" onSubmit={handleOnSubmitSearch}>
          <input name="query" type="search" />
          <button type="button" className={styles.menu}><a>Search</a></button>
        </form>

        <ul className={styles.grid}>
	  		{results.map(result => { 
	  		const {id, name, image } = result; 
	  		return( 			
	  		<li key={id} className={styles.card}> 
				<Link href="/episode/[id]" as={`/episode/${id}`}>
				<a href="#">
	  				<h3>{name}</h3> 
				</a>
				</Link>
	  		</li>
  		)
	  })}		
        </ul>
			<p>
  			<button onClick={handleLoadMore} type="button" className={styles.menu}><a>Load More</a></button>
			</p>
      </main>

      <footer className={styles.footer}>
        <a href="https://www.iamleanne.co.uk" target="_blank">Developed by Leanne Millar BSc.</a>
      </footer>
    </div>
  )
}
