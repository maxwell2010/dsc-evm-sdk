const path = require('path');
const dscSdkPath = path.resolve(__dirname, './dsc-js-sdk');
const bip39 = require(path.resolve(dscSdkPath, 'node_modules', 'bip39'));
const { Subgraph, Wallet, DecimalEVM, DecimalNetworks } = require(dscSdkPath);
const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);

// DEL
async function sendDEL(to, amount, mnemonic) {
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    try {
        const value = decimalEVM.parseEther(amount)
        const tx = await decimalEVM.sendDEL(to, value)
        console.log('result:', tx);
        return { success: true, data: JSON.stringify(tx) }; 
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

async function burndDEL(amount, mnemonic) {
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    try {
        const value = decimalEVM.parseEther(amount)
        const tx = await decimalEVM.burnDEL(value)
        console.log('result:', tx);
        return { success: true, data: JSON.stringify(tx) }; 
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}


// TOKEN
async function TokenBySymbol(symbol) {
    symbol = symbol.toLowerCase(); // Преобразуем symbol в прописные
    try {
        const result = await decimalEVM.getAddressTokenBySymbol(symbol);
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

async function TransferToken(tokenAddress, to, amount, mnemonic) {
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const value = decimalEVM.parseEther(amount);
    try {
        const result = await decimalEVM.transferToken(tokenAddress, to, value)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

async function TransferFromToken(tokenAddress, from, to, amount, mnemonic) {
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const value = decimalEVM.parseEther(amount);
    try {
        const result = await decimalEVM.transferFromToken(tokenAddress, from, to, value)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

async function TransferTokenSymbol(symbol, to, amount, mnemonic) {
    symbol = symbol.toLowerCase(); // Преобразуем symbol в прописные
    const tokenResult = await TokenBySymbol(symbol);
    if (!tokenResult.success) {
        console.error('Error fetching token address:', tokenResult.error);
        return { success: false, error: tokenResult.error };
    }
    const tokenAddress = tokenResult.data;
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const value = decimalEVM.parseEther(amount);
    try {
        const result = await decimalEVM.transferToken(tokenAddress, to, value);
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

async function BurnToken(tokenAddress, amount, mnemonic) {
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const value = decimalEVM.parseEther(amount);
    try {
        const result = await decimalEVM.burnToken(tokenAddress, value)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

async function ApproveToken(tokenAddress, spender, amount, mnemonic) {
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const value = decimalEVM.parseEther(amount);
    try {
        const result = await decimalEVM.approveToken(tokenAddress, spender, value)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

async function ApproveTokenSymbol(symbol, spender, amount, mnemonic) {
    symbol = symbol.toLowerCase(); // Преобразуем symbol в прописные
    const tokenResult = await TokenBySymbol(symbol);
    if (!tokenResult.success) {
        console.error('Error fetching token address:', tokenResult.error);
        return { success: false, error: tokenResult.error };
    }
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const value = decimalEVM.parseEther(amount);
    const tokenAddress = tokenResult.data;
    try {
        const result = await decimalEVM.approveToken(tokenAddress, spender, value)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

// buy Token For Exact DEL
async function BuyDelForToken(tokenAddress, amount, mnemonic) { 
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const recipient = decimalWallet.evmAddress
    const amountDel = decimalEVM.parseEther(amount); // 10 DEL
    const amountOutMin = await decimalEVM.calculateBuyOutput(tokenAddress, amountDel) // the minimum number of tokens to receive for 10 DEL
    // At the time of the transaction, the price may change, so you can take away, for example, 10% of the amountOutMin
    // const amountOutMinNew = amountOutMin - (amountOutMin * 10n / 100n) 
    try {
        const result = await decimalEVM.buyTokenForExactDEL(tokenAddress, amountDel, amountOutMin, recipient)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

// buy Token For Exact DEL
async function BuyDelForTokenSymbol(symbol, amount, mnemonic) {
    symbol = symbol.toLowerCase(); // Преобразуем symbol в прописные
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const recipient = decimalWallet.evmAddress
    const amountDel = decimalEVM.parseEther(amount); // 10 DEL
    const tokenResult = await TokenBySymbol(symbol);
    if (!tokenResult.success) {
        console.error('Error fetching token address:', tokenResult.error);
        return { success: false, error: tokenResult.error };
    }
    const tokenAddress = tokenResult.data;
    const amountOutMin = await decimalEVM.calculateBuyOutput(tokenAddress, amountDel) // the minimum number of tokens to receive for 10 DEL
    // At the time of the transaction, the price may change, so you can take away, for example, 10% of the amountOutMin
    // const amountOutMinNew = amountOutMin - (amountOutMin * 10n / 100n) 
    try {
        const result = await decimalEVM.buyTokenForExactDEL(tokenAddress, amountDel, amountOutMin, recipient)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

// buy Exact Token For DEL
async function BuyTokenForDel(tokenAddress, amount, mnemonic) { 
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const recipient = decimalWallet.evmAddress
    const amountOut = decimalEVM.parseEther(amount); // amount tokens 
    const amountDel = await decimalEVM.calculateBuyInput(tokenAddress, amountOut) // the amount of DEL to buy 10 tokens
    //If you have sent more DEL than you need, the difference will be refunded
    try {
        const result = await decimalEVM.buyExactTokenForDEL(tokenAddress, amountDel, amountOut, recipient)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

// buy Exact Token For DEL
async function BuyTokenForDelSymbol(symbol, amount, mnemonic) {
    symbol = symbol.toLowerCase(); // Преобразуем symbol в прописные
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const recipient = decimalWallet.evmAddress
    const amountOut = decimalEVM.parseEther(amount); // amount tokens 
    const tokenResult = await TokenBySymbol(symbol);
    if (!tokenResult.success) {
        console.error('Error fetching token address:', tokenResult.error);
        return { success: false, error: tokenResult.error };
    }
    const tokenAddress = tokenResult.data;
    const amountDel = await decimalEVM.calculateBuyInput(tokenAddress, amountOut) // the amount of DEL to buy 10 tokens
    //If you have sent more DEL than you need, the difference will be refunded
    try {
        const result = await decimalEVM.buyExactTokenForDEL(tokenAddress, amountDel, amountOut, recipient)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

// sell Tokens For Exact DEL
async function SellDelForToken(tokenAddress, amount, mnemonic) {
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    const recipient = decimalWallet.evmAddress
    amount = amount.toString(); // Преобразуем amount в строку
    const amountOut = decimalEVM.parseEther(amount); // 10 DEL
    const amountInMax = await decimalEVM.calculateSellInput(tokenAddress, amountOut) // the number of tokens sold to receive 10 DEL
    // At the time of the transaction, the price may change, so you can add away, for example, 10% to the amountInMax
    // const amountInMaxNew = amountInMax + (amountInMax * 10n / 100n)
    try {
        const result = await decimalEVM.sellTokensForExactDEL(tokenAddress, amountOut, amountInMax, recipient)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

// sell Tokens For Exact DEL
async function SellDelForTokenSymbol(symbol, amount, mnemonic) {
    symbol = symbol.toLowerCase(); // Преобразуем symbol в прописные
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const recipient = decimalWallet.evmAddress
    const amountOut = decimalEVM.parseEther(amount); // 10 DEL
    const tokenResult = await TokenBySymbol(symbol);
    if (!tokenResult.success) {
        console.error('Error fetching token address:', tokenResult.error);
        return { success: false, error: tokenResult.error };
    }
    const tokenAddress = tokenResult.data;
    const amountOutMax = await decimalEVM.calculateSellInput(tokenAddress, amountOut) // the number of tokens sold to receive 10 DEL
    // At the time of the transaction, the price may change, so you can add away, for example, 10% to the amountInMax
    // const amountInMaxNew = amountInMax + (amountInMax * 10n / 100n)
    try {
        const result = await decimalEVM.sellTokensForExactDEL(tokenAddress, amountOut, amountOutMax, recipient)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

// sell Exact Tokens For DEL
async function SellTokenForDel(tokenAddress, amount, mnemonic) {
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    const recipient = decimalWallet.evmAddress
    amount = amount.toString(); // Преобразуем amount в строку
    const amountIn = decimalEVM.parseEther(amount); // 10 tokens
    const amountOutMin = await decimalEVM.calculateSellOutput(tokenAddress, amountIn) // the minimum amount of DEL to sell 10 tokens
    // At the time of the transaction, the price may change, so you can take away, for example, 10% of the amountOutMin
    // const amountOutMinNew = amountOutMin - (amountOutMin * 10n / 100n)
    try {
        const result = await decimalEVM.sellExactTokensForDEL(tokenAddress, amountIn, amountOutMin, recipient)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

// sell Exact Tokens For DEL
async function SellTokenForDelSymbol(symbol, amount, mnemonic) {
    symbol = symbol.toLowerCase(); // Преобразуем symbol в прописные
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const recipient = decimalWallet.evmAddress
    const amountIn = decimalEVM.parseEther(amount); // 10 tokens
    const tokenResult = await TokenBySymbol(symbol);
    if (!tokenResult.success) {
        console.error('Error fetching token address:', tokenResult.error);
        return { success: false, error: tokenResult.error };
    }
    const tokenAddress = tokenResult.data;
    const amountOutMin = await decimalEVM.calculateSellOutput(tokenAddress, amountIn) // the minimum amount of DEL to sell 10 tokens
    // At the time of the transaction, the price may change, so you can take away, for example, 10% of the amountOutMin
    // const amountOutMinNew = amountOutMin - (amountOutMin * 10n / 100n)
    try {
        const result = await decimalEVM.sellExactTokensForDEL(tokenAddress, amountIn, amountOutMin, recipient)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

// approve Token
async function ConvertTokenToToken(tokenAddress1, tokenAddress2, amount, mnemonic) {
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const amountIn = decimalEVM.parseEther(amount); // 10 tokens
    const futureDEL = await decimalEVM.calculateSellOutput(tokenAddress1, amountIn)
    const amountOutMin = await decimalEVM.calculateBuyOutput(tokenAddress2, futureDEL)
    // At the time of the transaction, the price may change, so you can take away, for example, 10% of the amountOutMin
    // const amountOutMinNew = amountOutMin - (amountOutMin * 10n / 100n)
    try {
        await decimalEVM.approveToken(tokenAddress1, tokenCenterAddress, amountIn) // approve to transfer tokenCenterAddress for convertToken
        const result = await decimalEVM.convertToken(tokenAddress1, tokenAddress2, amountIn, amountOutMin, recipient)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}


async function ConvertTokenToTokenSymbol(symbol, amount, mnemonic) {
    symbol = symbol.toLowerCase(); // Преобразуем symbol в прописные
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const recipient = decimalWallet.evmAddress
    const amountIn = decimalEVM.parseEther(amount); // 10 tokens
    const tokenResult = await TokenBySymbol(symbol);
    if (!tokenResult.success) {
        console.error('Error fetching token address:', tokenResult.error);
        return { success: false, error: tokenResult.error };
    }
    const tokenAddress = tokenResult.data;
    const amountOutMin = await decimalEVM.calculateSellOutput(tokenAddress, amountIn) // the minimum amount of DEL to sell 10 tokens
    // At the time of the transaction, the price may change, so you can take away, for example, 10% of the amountOutMin
    // const amountOutMinNew = amountOutMin - (amountOutMin * 10n / 100n)
    try {
        const result = await decimalEVM.sellExactTokensForDEL(tokenAddress, amountIn, amountOutMin, recipient)
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}


// Delegation
async function DelegationDEL(validator, days, amount, mnemonic) {
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const amountParsed = decimalEVM.parseEther(amount); // Преобразуем строку в BigNumber
    try {
        // Corrected the if statement syntax
        if (days <= 0) {
            const result = await decimalEVM.delegateDEL(validator, amountParsed);
            console.log('result:', result);
            return { success: true, data: result };
        }
        console.log('Delegation without hold successful');
        // Если используем hold
        const sec = days * 86400;
        const latestBlock = await decimalEVM.getLatestBlock();
        if (!latestBlock) {
            throw new Error('Failed to fetch the latest block');
        }
        const holdTimestamp = latestBlock.timestamp + sec;
        const result = await decimalEVM.delegateDELHold(validator, amountParsed, holdTimestamp);
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

// approve Token
async function DelegationTokenApprove(validator, tokenAddress, days, amount, mnemonic) {
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const amountParsed = decimalEVM.parseEther(amount); // Преобразуем строку в BigNumber

    const delegationAddress = await decimalEVM.getDecimalContractAddress('delegation')
    await decimalEVM.approveToken(tokenAddress, delegationAddress, amount)

    try {
        // Corrected the if statement syntax
        if (days <= 0) {
            const result = await decimalEVM.delegateToken(validator, tokenAddress, amount);
            console.log('result:', result);
            return { success: true, data: result };
        }
        console.log('Delegation without hold successful');
        // Если используем hold
        const sec = days * 86400;
        const latestBlock = await decimalEVM.getLatestBlock();
        if (!latestBlock) {
            throw new Error('Failed to fetch the latest block');
        }
        const holdTimestamp = latestBlock.timestamp + sec;
        const result = await decimalEVM.delegateTokenHold(validator, tokenAddress, amount, holdTimestamp);
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}

// permit Token
async function DelegationTokenPermit(validator, tokenAddress, days, amount, mnemonic) {
    const decimalWallet = new Wallet(mnemonic);
    const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);
    amount = amount.toString(); // Преобразуем amount в строку
    const delegationAddress = await decimalEVM.getDecimalContractAddress('delegation')
    const sign = await decimalEVM.getSignPermitToken(tokenAddress, delegationAddress, amount)

    try {
        // Corrected the if statement syntax
        if (days <= 0) {
            const result = await decimalEVM.delegateToken(validator, tokenAddress, amount, sign);
            console.log('result:', result);
            return { success: true, data: result };
        }
        console.log('Delegation without hold successful');
        // Если используем hold
        const sec = days * 86400;
        const latestBlock = await decimalEVM.getLatestBlock();
        if (!latestBlock) {
            throw new Error('Failed to fetch the latest block');
        }
        const holdTimestamp = latestBlock.timestamp + sec;
        const result = await decimalEVM.delegateTokenHold(validator, tokenAddress, amount, holdTimestamp, sign);
        console.log('result:', result);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error };
    }
}
