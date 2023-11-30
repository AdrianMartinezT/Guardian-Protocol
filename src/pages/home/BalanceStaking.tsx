
import { useState } from "react";
import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { Button } from "@gear-js/ui";
import {
  Card,
  CardBody,
  HStack,
  Heading,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Flex,
  
} from "@chakra-ui/react";

function BalanceStakingCard() {
  const { account } = useAccount();
  const [totalBalance, SetTotalBalance] = useState(0);
  const [totalLocked, setTotalLocked] = useState(0);
  const [totalUnbond, setTotalUnbond] = useState(0);

    

  const { api } = useApi();

  const balancestaking = async () => {
    const {
      data: {
        free: balance,
        reserved: stakedBalance,
        miscFrozen: MiscFrozen,
        feeFrozen: FeeFrozen,
        
      },
    }: any = await api.query.system.account(account?.address);
    
    SetTotalBalance(balance.toHuman());

    setTotalLocked(MiscFrozen.toHuman());

    setTotalUnbond(FeeFrozen.toHuman());
  };
  balancestaking();
  
  const trasnsferBalance = totalBalance - totalLocked;


  return (
        <HStack>
          <Flex direction="row" gap="6" >
          <StatGroup display="contents" >
            <Stat paddingLeft="5px">
              <StatLabel>Total Balance</StatLabel>
              <StatNumber>{totalBalance}</StatNumber>
            
            </Stat>

            <Stat paddingLeft="5px" >
              <StatLabel  >Locked Balance</StatLabel>
              <StatNumber>{totalLocked}</StatNumber>
            </Stat>
          
            <Stat paddingLeft="5px">
              
              <StatLabel>Transfer Balance</StatLabel>
              
              <StatNumber>{Number(trasnsferBalance ?? 0)}</StatNumber>
            </Stat>

          </StatGroup>
          </Flex>
        </HStack>
  );
}

export { BalanceStakingCard };