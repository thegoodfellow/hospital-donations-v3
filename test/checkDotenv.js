require('dotenv').config({ path: '../.env' });

function main(){
    console.log(process.env.NETWORK_URL);
}

main();