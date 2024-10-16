const path = require('path');
const dscSdkPath = path.resolve(__dirname, './dsc-js-sdk');
const SDK = require(dscSdkPath);
const bip39 = require(path.resolve(dscSdkPath, 'node_modules', 'bip39'));

async function TokenBySymbol(decimalEVM, symbol) {
    try {
        tx = await decimalEVM.getAddressTokenBySymbol(symbol.toLowerCase());
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function sendDEL(decimalEVM, to, amount) {
    amount = amount.toString();
    try {
        value = decimalEVM.parseEther(amount);
        tx = await decimalEVM.sendDEL(to, value);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function burnDEL(decimalEVM, amount) {
    amount = amount.toString();
    try {
        value = decimalEVM.parseEther(amount);
        tx = await decimalEVM.burnDEL(value);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function balanceDEL(decimalEVM, address) {
    try {
        tx = await decimalEVM.getBalance(address);
        return { success: true, data: tx.toString() };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function balanceToken(decimalEVM, tokenAddress, address) {
    try {
        tx = await decimalEVM.balanceOfToken(tokenAddress, address);
        return { success: true, data: tx.toString() };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function balanceTokenSymbol(decimalEVM, symbol, address) {
    tokenResult = await TokenBySymbol(decimalEVM, symbol);
        if (!tokenResult.success) {
            return { success: false, error: tokenResult.error };
        }
    tokenAddress = tokenResult.data;
    try {
        tx = await decimalEVM.balanceOfToken(tokenAddress, address);
        return { success: true, data: tx.toString() };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function delegationDEL(decimalEVM, validator, days, amount) {
    amount = decimalEVM.parseEther(amount);
    if (days <= 0) {
        try {
            tx = await decimalEVM.delegateDEL(validator, amount);
            return { success: true, data: tx };
        } catch (error) {
            return { success: false, error: error.message || error };
        }
    } else {
        sec = days * 86400;
        latestBlock = await decimalEVM.getLatestBlock();
        holdTimestamp = latestBlock.timestamp + sec;
        try {
            tx = await decimalEVM.delegateDELHold(validator, amount, holdTimestamp);
            return { success: true, data: tx };
        } catch (error) {
            return { success: false, error: error.message || error };
        }
    }
}


async function TransferToken(decimalEVM, tokenAddress, to, amount) {
    amount = amount.toString();
    value = decimalEVM.parseEther(amount);
    try {
        tx = await decimalEVM.transferToken(tokenAddress, to, value);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function TransferFromToken(decimalEVM, tokenAddress, from, to, amount) {
    amount = amount.toString();
    value = decimalEVM.parseEther(amount);
    try {
        tx = await decimalEVM.transferFromToken(tokenAddress, from, to, value);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function TransferTokenSymbol(decimalEVM, symbol, to, amount) {
    tokenResult = await TokenBySymbol(decimalEVM, symbol);
    if (!tokenResult.success) {
        return { success: false, error: tokenResult.error };
    }
    tokenAddress = tokenResult.data;
    try {
        tx = await TransferToken(decimalEVM, tokenAddress, to, amount);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function BurnToken(decimalEVM, tokenAddress, amount) {
    amount = amount.toString();
    value = decimalEVM.parseEther(amount);
    try {
        tx = await decimalEVM.burnToken(tokenAddress, value);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function BurnTokenSymbol(decimalEVM, symbol, amount) {
    amount = amount.toString();
    value = decimalEVM.parseEther(amount);
    tokenResult = await TokenBySymbol(decimalEVM, symbol);
    if (!tokenResult.success) {
        return { success: false, error: tokenResult.error };
    }
    tokenAddress = tokenResult.data;
    try {
        tx = await decimalEVM.burnToken(tokenAddress, value);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function ApproveToken(decimalEVM, tokenAddress, spender, amount) {
    amount = amount.toString();
    value = decimalEVM.parseEther(amount);
    try {
        tx = await decimalEVM.approveToken(tokenAddress, spender, value);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function ApproveTokenSymbol(decimalEVM, symbol, spender, amount) {
    tokenResult = await TokenBySymbol(decimalEVM, symbol);
    if (!tokenResult.success) {
        return { success: false, error: tokenResult.error };
    }
    const tokenAddress = tokenResult.data;
    try {
        tx = await ApproveToken(decimalEVM, tokenAddress, spender, amount);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function BuyDelForToken(decimalEVM, tokenAddress, amount) {
    amount = amount.toString();
    recipient = decimalEVM.wallet.evmAddress;
    amountDel = decimalEVM.parseEther(amount);
    amountOutMin = await decimalEVM.calculateBuyOutput(tokenAddress, amountDel);
    try {
        tx = await decimalEVM.buyTokenForExactDEL(tokenAddress, amountDel, amountOutMin, recipient);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function BuyDelForTokenSymbol(decimalEVM, symbol, amount) {
    tokenResult = await TokenBySymbol(decimalEVM, symbol);
    if (!tokenResult.success) {
        return { success: false, error: tokenResult.error };
    }
    tokenAddress = tokenResult.data;
    try {
        tx = await BuyDelForToken(decimalEVM, tokenAddress, amount);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function BuyTokenForDel(decimalEVM, tokenAddress, amount) {
    amount = amount.toString();
    recipient = decimalEVM.wallet.evmAddress;
    amountOut = decimalEVM.parseEther(amount);
    amountDel = await decimalEVM.calculateBuyInput(tokenAddress, amountOut);
    try {
        tx = await decimalEVM.buyExactTokenForDEL(tokenAddress, amountDel, amountOut, recipient);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function BuyTokenForDelSymbol(decimalEVM, symbol, amount) {
    tokenResult = await TokenBySymbol(decimalEVM, symbol);
    if (!tokenResult.success) {
        return { success: false, error: tokenResult.error };
    }
    tokenAddress = tokenResult.data;
    try {
        tx = await BuyTokenForDel(decimalEVM, tokenAddress, amount);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function SellDelForToken(decimalEVM, tokenAddress, amount) {
    amount = amount.toString();
    recipient = decimalEVM.wallet.evmAddress;
    amountOut = decimalEVM.parseEther(amount);
    amountInMax = await decimalEVM.calculateSellInput(tokenAddress, amountOut);
    try {
        tx = await decimalEVM.sellTokensForExactDEL(tokenAddress, amountOut, amountInMax, recipient);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function SellDelForTokenSymbol(decimalEVM, symbol, amount) {
    tokenResult = await TokenBySymbol(decimalEVM, symbol);
    if (!tokenResult.success) {
        return { success: false, error: tokenResult.error };
    }
    tokenAddress = tokenResult.data;
    try {
        tx = await SellDelForToken(decimalEVM, tokenAddress, amount);
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function ConvertTokenToToken(decimalEVM, tokenAddress1, tokenAddress2, amount) {
    amount = amount.toString();
    amountIn = decimalEVM.parseEther(amount); // 10 tokens
    futureDEL = await decimalEVM.calculateSellOutput(tokenAddress1, amountIn)
    amountOutMin = await decimalEVM.calculateBuyOutput(tokenAddress2, futureDEL)
    // At the time of the transaction, the price may change, so you can take away, for example, 10% of the amountOutMin
    // const amountOutMinNew = amountOutMin - (amountOutMin * 10n / 100n)
    sign = await decimalEVM.getSignPermitToken(tokenAddress1, tokenCenterAddress, amountIn) // get signature to approve transfer token for tokenCenterAddress
    try {
        tx = await decimalEVM.convertToken(tokenAddress1, tokenAddress2, amountIn, amountOutMin, recipient, sign)
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function ConvertTokenToTokenSymbol(decimalEVM, tokenSymbol1, tokenSymbol2, amount) {
    amount = amount.toString();
    amountIn = decimalEVM.parseEther(amount); // 10 tokens
    futureDEL = await decimalEVM.calculateSellOutput(tokenAddress1, amountIn)
    amountOutMin = await decimalEVM.calculateBuyOutput(tokenAddress2, futureDEL)
    tokenResult1 = await TokenBySymbol(decimalEVM, tokenSymbol1);
    if (!tokenResult1.success) {
        return { success: false, error: tokenResult1.error };
    }
    tokenAddress1 = tokenResult1.data;
    tokenResult2 = await TokenBySymbol(decimalEVM, tokenSymbol2);
    if (!tokenResult2.success) {
        return { success: false, error: tokenResult2.error };
    }
    tokenAddress2 = tokenResult2.data;
    sign = await decimalEVM.getSignPermitToken(tokenAddress1, tokenCenterAddress, amountIn)
    try {
        tx = await decimalEVM.convertToken(tokenAddress1, tokenAddress2, amountIn, amountOutMin, recipient, sign)
        return { success: true, data: tx };
    } catch (error) {
        return { success: false, error: error.message || error };
    }
}

async function DelegationToken(decimalEVM, validator, tokenAddress, days, amount) {
    amount = decimalEVM.parseEther(amount);
    delegationAddress  = await decimalEVM.getDecimalContractAddress('delegation')
    sign = await decimalEVM.getSignPermitToken(tokenAddress, delegationAddress, amount)
    if (days <= 0) {
        try {
            tx = await decimalEVM.delegateToken(validator, tokenAddress, amount, sign)
            return { success: true, data: tx };
        } catch (error) {
            return { success: false, error: error.message || error };
        }
    } else {
        sec = days * 86400;
        latestBlock = await decimalEVM.getLatestBlock();
        holdTimestamp = latestBlock.timestamp + sec;
        try {
            tx = await decimalEVM.delegateTokenHold(validator, tokenAddress, amount, holdTimestamp, sign);
            return { success: true, data: tx };
        } catch (error) {
            return { success: false, error: error.message || error };
        }
    }
}

async function DelegationTokenSymbol(decimalEVM, validator, symbol, days, amount) {
    amount = decimalEVM.parseEther(amount);
    tokenResult = await TokenBySymbol(decimalEVM, symbol);
    if (!tokenResult.success) {
        return { success: false, error: tokenResult.error };
    }
    tokenAddress = tokenResult.data;
    delegationAddress  = await decimalEVM.getDecimalContractAddress('delegation')
    sign = await decimalEVM.getSignPermitToken(tokenAddress, delegationAddress, amount)
    if (days <= 0) {
        try {
            tx = await decimalEVM.delegateToken(validator, tokenAddress, amount, sign)
            return { success: true, data: tx };
        } catch (error) {
            return { success: false, error: error.message || error };
        }
    } else {
        sec = days * 86400;
        latestBlock = await decimalEVM.getLatestBlock();
        holdTimestamp = latestBlock.timestamp + sec;
        try {
            tx = await decimalEVM.delegateTokenHold(validator, tokenAddress, amount, holdTimestamp, sign);
            return { success: true, data: tx };
        } catch (error) {
            return { success: false, error: error.message || error };
        }
    }
}



module.exports = {
    TokenBySymbol,
    sendDEL,
    burnDEL,
    balanceDEL,
    balanceToken,
    balanceTokenSymbol,
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
};
