/* List out the computational inefficiencies and anti-patterns found in the code block below.
    1. This code block uses
        1. ReactJS with TypeScript.
        2. Functional components.
        3. React Hooks
    2. You should also provide a refactored version of the code, but more points are awarded to accurately stating the issues and explaining correctly how to improve them.
*/

interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

// 1. We can use destructuring right in props parameters
const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  // 2. blockchain should have type string
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      // 3. We can group case "Zilliqa" and "Neo" to return same value
      case "Zilliqa":
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  // 4. We can refactor getPriority function like this:
  const getPriority2 = (blockchain: string) =>
    ({
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
      Default: -99,
    }[blockchain]);

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);

        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
        // 5. code above can become:
        // return lhsPriority > -99 && balance.amount <= 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }

        // 6. code above can become:
        // return rightPriority - leftPriority;
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  // 7. target sortedBalances can be use like this:
  const formattedBalancesOptimization = useMemo(() => {
    return balances.reduce((acc, balance) => {
      const balancePriority = getPriority(balance.blockchain);

      // Filter condition
      if (balancePriority > -99 && balance.amount <= 0) {
        // Map logic - format the balance
        const formattedBalance = {
          ...balance,
          formatted: balance.amount.toFixed(),
        };

        // Insert in sorted order
        const index = acc.findIndex(
          (item) => getPriority(item.blockchain) < balancePriority
        );

        if (index === -1) {
          acc.push(formattedBalance);
        } else {
          acc.splice(index, 0, formattedBalance);
        }
      }
      
      return acc;
    }, []);
  }, [balances, prices]);

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      // 8. we can destructuring balance into ({ amount, formatted }: FormattedWalletBalance, index: number)
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
