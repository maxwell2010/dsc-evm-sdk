const path = require('path');
const dscSdkPath = path.resolve(__dirname, './dsc-js-sdk');
const SDK = require(dscSdkPath);
const bip39 = require(path.resolve(dscSdkPath, 'node_modules', 'bip39'));

async function TokenBySymbol(decimalEVM, symbol) {
    try {
        const result = await decimalEVM.getAddressTokenBySymbol(symbol.toLowerCase());
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function sendDEL(decimalEVM, to, amount) {
    amount = amount.toString();
    try {
        const value = decimalEVM.parseEther(amount);
        const tx = await decimalEVM.sendDEL(to, value);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function burnDEL(decimalEVM, amount) {
    amount = amount.toString();
    try {
        const value = decimalEVM.parseEther(amount);
        const tx = await decimalEVM.burnDEL(value);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function TransferToken(decimalEVM, tokenAddress, to, amount) {
    amount = amount.toString();
    const value = decimalEVM.parseEther(amount);
    try {
        const result = await decimalEVM.transferToken(tokenAddress, to, value);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function TransferFromToken(decimalEVM, tokenAddress, from, to, amount) {
    amount = amount.toString();
    const value = decimalEVM.parseEther(amount);
    try {
        const result = await decimalEVM.transferFromToken(tokenAddress, from, to, value);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function TransferTokenSymbol(decimalEVM, symbol, to, amount) {
    const tokenResult = await TokenBySymbol(decimalEVM, symbol);
    if (!tokenResult.success) {
        return { success: false, error: tokenResult.error };
    }
    const tokenAddress = tokenResult.data;
    return await TransferToken(decimalEVM, tokenAddress, to, amount);
}

async function BurnToken(decimalEVM, tokenAddress, amount) {
    amount = amount.toString();
    const value = decimalEVM.parseEther(amount);
    try {
        const result = await decimalEVM.burnToken(tokenAddress, value);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function ApproveToken(decimalEVM, tokenAddress, spender, amount) {
    amount = amount.toString();
    const value = decimalEVM.parseEther(amount);
    try {
        const result = await decimalEVM.approveToken(tokenAddress, spender, value);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function ApproveTokenSymbol(decimalEVM, symbol, spender, amount) {
    const tokenResult = await TokenBySymbol(decimalEVM, symbol);
    if (!tokenResult.success) {
        return { success: false, error: tokenResult.error };
    }
    const tokenAddress = tokenResult.data;
    return await ApproveToken(decimalEVM, tokenAddress, spender, amount);
}

async function BuyDelForToken(decimalEVM, tokenAddress, amount) {
    amount = amount.toString();
    const recipient = decimalEVM.wallet.evmAddress;
    const amountDel = decimalEVM.parseEther(amount);
    const amountOutMin = await decimalEVM.calculateBuyOutput(tokenAddress, amountDel);
    try {
        const result = await decimalEVM.buyTokenForExactDEL(tokenAddress, amountDel, amountOutMin, recipient);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function BuyDelForTokenSymbol(decimalEVM, symbol, amount) {
    const tokenResult = await TokenBySymbol(decimalEVM, symbol);
    if (!tokenResult.success) {
        return { success: false, error: tokenResult.error };
    }
    const tokenAddress = tokenResult.data;
    return await BuyDelForToken(decimalEVM, tokenAddress, amount);
}

async function BuyTokenForDel(decimalEVM, tokenAddress, amount) {
    amount = amount.toString();
    const recipient = decimalEVM.wallet.evmAddress;
    const amountOut = decimalEVM.parseEther(amount);
    const amountDel = await decimalEVM.calculateBuyInput(tokenAddress, amountOut);
    try {
        const result = await decimalEVM.buyExactTokenForDEL(tokenAddress, amountDel, amountOut, recipient);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function BuyTokenForDelSymbol(decimalEVM, symbol, amount) {
    const tokenResult = await TokenBySymbol(decimalEVM, symbol);
    if (!tokenResult.success) {
        return { success: false, error: tokenResult.error };
    }
    const tokenAddress = tokenResult.data;
    return await BuyTokenForDel(decimalEVM, tokenAddress, amount);
}

async function SellDelForToken(decimalEVM, tokenAddress, amount) {
    amount = amount.toString();
    const recipient = decimalEVM.wallet.evmAddress;
    const amountOut = decimalEVM.parseEther(amount);
    const amountInMax = await decimalEVM.calculateSellInput(tokenAddress, amountOut);
    try {
        const result = await decimalEVM.sellTokensForExactDEL(tokenAddress, amountOut, amountInMax, recipient);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function SellDelForTokenSymbol(decimalEVM, symbol, amount) {
    const tokenResult = await TokenBySymbol(decimalEVM, symbol);
    if (!tokenResult.success) {
        return { success: false, error: tokenResult.error };
    }
    const tokenAddress = tokenResult.data;
    return await SellDelForToken(decimalEVM, tokenAddress, amount);
}

module.exports = {
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
};
