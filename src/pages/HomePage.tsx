import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import {
  Card,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

import {
  getCurrencyNames,
  getCurrencyValueByName,
  getDailyCurrencies,
} from "../services/currency";

export const HomePage = () => {
  const { data, isFetched } = useQuery("currencies", getDailyCurrencies);
  // We select the first item in the array of data, which should be the latest date (today).
  const chosenDateData = data?.[0];

  const { register, watch } = useForm({
    defaultValues: {
      fromCurrency: "NOK",
      toCurrency: "USD",
      amount: 100,
    },
  });

  let currencyNames: string[] = [];
  if (data) {
    currencyNames = getCurrencyNames(data);
  }

  const { fromCurrency, toCurrency, amount } = watch();

  const getTotal = () => {
    return (
      (getCurrencyValueByName(toCurrency, chosenDateData) /
        getCurrencyValueByName(fromCurrency, chosenDateData)) *
      amount
    );
  };

  const total = getTotal();

  const options = currencyNames.map((currencyName) => (
    <option key={currencyName} value={currencyName}>
      {currencyName}
    </option>
  ));

  return isFetched ? (
    <Container width="100%" height="100vh" display="flex" alignItems="center">
      <Card p="4rem" flexGrow={1}>
        <Flex gap={6} flexDirection="column">
          <Flex gap={4} flexDirection="column">
            <Flex gap={1}>
              <FormControl flexGrow={1}>
                <FormLabel htmlFor="fromCurrency">Exchange from</FormLabel>
                <Select
                  aria-label="select currency"
                  {...register("fromCurrency")}
                >
                  {options}
                </Select>
              </FormControl>

              <FormControl flexGrow={1}>
                <FormLabel htmlFor="toCurrency">Exchange to</FormLabel>
                <Select
                  aria-label="select currency"
                  {...register("toCurrency")}
                >
                  {options}
                </Select>
              </FormControl>
            </Flex>

            <FormControl>
              <FormLabel htmlFor="amount">Amount</FormLabel>
              <Input
                type="number"
                id="amount"
                className="input-number"
                {...register("amount")}
              />
            </FormControl>
          </Flex>

          {isNaN(total) ? (
            <Stat>
              <StatHelpText>
                The currency does not have a valid conversion rate
              </StatHelpText>
            </Stat>
          ) : (
            <Stat>
              <StatLabel>The exchanged amount totals</StatLabel>
              <StatNumber>{getTotal().toFixed(5)}</StatNumber>
              <StatHelpText>{toCurrency}</StatHelpText>
            </Stat>
          )}
        </Flex>
      </Card>
    </Container>
  ) : null;
};
