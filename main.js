const {
    TokenBySymbol,
    sendDEL,
    burnDEL,
    balanceDEL,
    delegationDEL,
    TransferToken,
    TransferFromToken,
    TransferTokenSymbol,
    BurnToken,
    BurnTokenSymbol,
    ApproveToken,
    ApproveTokenSymbol,
    BuyDelForToken,
    BuyDelForTokenSymbol,
    BuyTokenForDel,
    BuyTokenForDelSymbol,
    SellDelForToken,
    SellDelForTokenSymbol,
    ConvertTokenToToken,
    ConvertTokenToTokenSymbol,
    DelegationTokenSymbol,
    DelegationToken,
    SDK,
    bip39
} = require('./functions');

async function initialDecimalEVM(mnemonic) {
    const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
    const decimalWallet = mnemonic ? new Wallet(mnemonic) : new Wallet();
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    await decimalEVM.connect();
    return decimalEVM;
}

async function main() {
    const action = process.argv[2];
    const args = process.argv.slice(3);
    let decimalEVM; // Объявляем переменную здесь

    switch (action) {
        case 'TokenBySymbol':
            tokenSymbol = args[0].toLowerCase();
            decimalEVM = await initialDecimalEVM(null);
            tokenResponse = await TokenBySymbol(decimalEVM, tokenSymbol);
            console.log(JSON.stringify(tokenResponse));
            break;
        case 'sendDEL':
            [to, amount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            sendResponse = await sendDEL(decimalEVM, to, amount);
            console.log(JSON.stringify(sendResponse));
            break;
        case 'burnDEL':
            [burnAmount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            burnResponse = await burnDEL(decimalEVM, burnAmount);
            console.log(JSON.stringify(burnResponse));
            break;
        case 'balanceDEL':
            address = args[0];
            decimalEVM = await initialDecimalEVM(null);
            balance = await balanceDEL(decimalEVM, address);
            console.log(JSON.stringify(balance));
            break;
        case 'delegationDEL':
            [validator, days, amount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            delegationDELResponse = await delegationDEL(decimalEVM, validator, days, amount);
            console.log(JSON.stringify(delegationDELResponse));
            break;
        case 'TransferToken':
            [tokenAddress, toAddress, transferAmount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            transferResponse = await TransferToken(decimalEVM, tokenAddress, toAddress, transferAmount);
            console.log(JSON.stringify(transferResponse));
            break;
        case 'TransferFromToken': // ???
            [tokenAddress, fromAddress, toAddr, transferFromAmount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            transferFromResponse = await TransferFromToken(decimalEVM, tokenAddress, fromAddress, toAddr, transferFromAmount);
            console.log(JSON.stringify(transferFromResponse));
            break;
        case 'TransferTokenSymbol':
            [symbol, toAddr, transferSymbolAmount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            transferSymbolResponse = await TransferTokenSymbol(decimalEVM, symbol, toAddr, transferSymbolAmount);
            console.log(JSON.stringify(transferSymbolResponse));
            break;
        case 'BurnToken':
            [burnTokenAddress, burnTokenAmount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            burnTokenResponse = await BurnToken(decimalEVM, burnTokenAddress, burnTokenAmount);
            console.log(JSON.stringify(burnTokenResponse));
            break;
        case 'BurnTokenSymbol':
            [symbol, amount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            burnTokenResponse = await BurnTokenSymbol(decimalEVM, symbol, amount);
            console.log(JSON.stringify(burnTokenResponse));
            break;
        case 'ApproveToken':
            [approveTokenAddress, spender, approveAmount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            approveResponse = await ApproveToken(decimalEVM, approveTokenAddress, spender, approveAmount);
            console.log(JSON.stringify(approveResponse));
            break;
        case 'ApproveTokenSymbol':
            [approveSymbol, approveSpender, approveSymbolAmount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            approveSymbolResponse = await ApproveTokenSymbol(decimalEVM, approveSymbol, approveSpender, approveSymbolAmount);
            console.log(JSON.stringify(approveSymbolResponse));
            break;
        case 'BuyDelForToken':
            [buyTokenAddress, buyAmount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            buyResponse = await BuyDelForToken(decimalEVM, buyTokenAddress, buyAmount);
            console.log(JSON.stringify(buyResponse));
            break;
        case 'BuyDelForTokenSymbol':
            [buySymbol, buySymbolAmount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            buySymbolResponse = await BuyDelForTokenSymbol(decimalEVM, buySymbol, buySymbolAmount);
            console.log(JSON.stringify(buySymbolResponse));
            break;
        case 'BuyTokenForDel':
            [buyForTokenAddress, buyForAmount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            buyForResponse = await BuyTokenForDel(decimalEVM, buyForTokenAddress, buyForAmount);
            console.log(JSON.stringify(buyForResponse));
            break;
        case 'BuyTokenForDelSymbol':
            [buyForSymbol, buyForSymbolAmount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            buyForSymbolResponse = await BuyTokenForDelSymbol(decimalEVM, buyForSymbol, buyForSymbolAmount);
            console.log(JSON.stringify(buyForSymbolResponse));
            break;
        case 'SellDelForToken':
            [sellTokenAddress, sellAmount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            sellResponse = await SellDelForToken(decimalEVM, sellTokenAddress, sellAmount);
            console.log(JSON.stringify(sellResponse));
            break;
        case 'SellDelForTokenSymbol':
            [sellSymbol, sellSymbolAmount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            sellSymbolResponse = await SellDelForTokenSymbol(decimalEVM, sellSymbol, sellSymbolAmount);
            console.log(JSON.stringify(sellSymbolResponse));
            break;
        case 'ConvertTokenToToken':
            [tokenAddress1, tokenAddress2, amount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            ConvertTokenToTokenResponse = await ConvertTokenToToken(decimalEVM, tokenAddress1, tokenAddress2, amount);
            console.log(JSON.stringify(ConvertTokenToTokenResponse));
            break;
        case 'ConvertTokenToTokenSymbol':
            [tokenSymbol1, tokenSymbol2, amount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            ConvertTokenToTokenResponse = await ConvertTokenToTokenSymbol(decimalEVM, tokenSymbol1, tokenSymbol2, amount);
            console.log(JSON.stringify(ConvertTokenToTokenResponse));
            break;
        case 'DelegationTokenSymbol':
            [validator, symbol, days, amount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            DelegationTokenSymbolResponse = await DelegationTokenSymbol(decimalEVM, validator, symbol, days, amount);
            console.log(JSON.stringify(DelegationTokenSymbolResponse));
            break;
        case 'DelegationToken':
            [validator, tokenAddress, days, amount, mnemonic] = args;
            decimalEVM = await initialDecimalEVM(mnemonic);
            DelegationTokenResponse = await DelegationToken(decimalEVM, validator, tokenAddress, days, amount);
            console.log(JSON.stringify(DelegationTokenResponse));
            break;
        default:
            console.error('Unknown action:', action);
    }
}

main();
