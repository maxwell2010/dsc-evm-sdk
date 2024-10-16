const {
    TokenBySymbol,
    sendDEL,
    burnDEL,
    TransferToken,
    TransferFromToken,
    TransferTokenSymbol,
    BurnToken,
    ApproveToken,
    ApproveTokenSymbol,
    BuyDelForToken,
    BuyDelForTokenSymbol,
    BuyTokenForDel,
    BuyTokenForDelSymbol,
    SellDelForToken,
    SellDelForTokenSymbol,
    SDK,
    bip39
} = require('./functions');

async function main() {
    let mnemonic = null;
    const action = process.argv[2];
    const args = process.argv.slice(3);

    const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
    const decimalWallet = mnemonic ? new Wallet(mnemonic) : new Wallet();
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    await decimalEVM.connect();

    switch (action) {
        case 'TokenBySymbol':
            const tokenSymbol = args[0].toLowerCase();
            const tokenResponse = await TokenBySymbol(decimalEVM, tokenSymbol);
            console.log(JSON.stringify(tokenResponse));
            break;
        case 'sendDEL':
            const [to, amount] = args;
            const sendResponse = await sendDEL(decimalEVM, to, amount);
            console.log(JSON.stringify(sendResponse));
            break;
        case 'burnDEL':
            const burnAmount = args[0];
            const burnResponse = await burnDEL(decimalEVM, burnAmount);
            console.log(JSON.stringify(burnResponse));
            break;
        case 'TransferToken':
            const [tokenAddress, toAddress, transferAmount] = args;
            const transferResponse = await TransferToken(decimalEVM, tokenAddress, toAddress, transferAmount);
            console.log(JSON.stringify(transferResponse));
            break;
        case 'TransferFromToken':
            const [fromAddress, toAddr, transferFromAmount] = args;
            const transferFromResponse = await TransferFromToken(decimalEVM, tokenAddress, fromAddress, toAddr, transferFromAmount);
            console.log(JSON.stringify(transferFromResponse));
            break;
        case 'TransferTokenSymbol':
            const [transferSymbol, toAddrSymbol, transferSymbolAmount] = args;
            const transferSymbolResponse = await TransferTokenSymbol(decimalEVM, transferSymbol, toAddrSymbol, transferSymbolAmount);
            console.log(JSON.stringify(transferSymbolResponse));
            break;
        case 'BurnToken':
            const [burnTokenAddress, burnTokenAmount] = args;
            const burnTokenResponse = await BurnToken(decimalEVM, burnTokenAddress, burnTokenAmount);
            console.log(JSON.stringify(burnTokenResponse));
            break;
        case 'ApproveToken':
            const [approveTokenAddress, spender, approveAmount] = args;
            const approveResponse = await ApproveToken(decimalEVM, approveTokenAddress, spender, approveAmount);
            console.log(JSON.stringify(approveResponse));
            break;
        case 'ApproveTokenSymbol':
            const [approveSymbol, approveSpender, approveSymbolAmount] = args;
            const approveSymbolResponse = await ApproveTokenSymbol(decimalEVM, approveSymbol, approveSpender, approveSymbolAmount);
            console.log(JSON.stringify(approveSymbolResponse));
            break;
        case 'BuyDelForToken':
            const [buyTokenAddress, buyAmount] = args;
            const buyResponse = await BuyDelForToken(decimalEVM, buyTokenAddress, buyAmount);
            console.log(JSON.stringify(buyResponse));
            break;
        case 'BuyDelForTokenSymbol':
            const [buySymbol, buySymbolAmount] = args;
            const buySymbolResponse = await BuyDelForTokenSymbol(decimalEVM, buySymbol, buySymbolAmount);
            console.log(JSON.stringify(buySymbolResponse));
            break;
        case 'BuyTokenForDel':
            const [buyForTokenAddress, buyForAmount] = args;
            const buyForResponse = await BuyTokenForDel(decimalEVM, buyForTokenAddress, buyForAmount);
            console.log(JSON.stringify(buyForResponse));
            break;
        case 'BuyTokenForDelSymbol':
            const [buyForSymbol, buyForSymbolAmount] = args;
            const buyForSymbolResponse = await BuyTokenForDelSymbol(decimalEVM, buyForSymbol, buyForSymbolAmount);
            console.log(JSON.stringify(buyForSymbolResponse));
            break;
        case 'SellDelForToken':
            const [sellTokenAddress, sellAmount] = args;
            const sellResponse = await SellDelForToken(decimalEVM, sellTokenAddress, sellAmount);
            console.log(JSON.stringify(sellResponse));
            break;
        case 'SellDelForTokenSymbol':
            const [sellSymbol, sellSymbolAmount] = args;
            const sellSymbolResponse = await SellDelForTokenSymbol(decimalEVM, sellSymbol, sellSymbolAmount);
            console.log(JSON.stringify(sellSymbolResponse));
            break;
        default:
            console.error('Unknown action:', action);
    }
}

main();
