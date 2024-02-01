import figlet from 'figlet'



export function helloMessage()
	 {
		  console.log( '\n\n' )
		  console.log( figlet.textSync( 'Methylphenidate', 'Doom' ) )
		  console.log( `Methylophenidate is a boilerplate for Nest.js applications with batteries included.` )
		  console.log( `Application will start it's boot process in a while...` )
		  console.log( '\n\n' )
	 }
