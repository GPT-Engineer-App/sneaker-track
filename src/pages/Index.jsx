import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  HStack,
} from '@chakra-ui/react';

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-10-01', amount: 200, type: 'Expense', category: 'Nike' },
    { id: 2, date: '2023-10-02', amount: 150, type: 'Income', category: 'Adidas' },
  ]);

  const [form, setForm] = useState({
    date: '',
    amount: '',
    type: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = { ...form, id: transactions.length + 1 };
    setTransactions([...transactions, newTransaction]);
    setForm({ date: '', amount: '', type: '', category: '' });
  };

  const handleEdit = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setForm(transaction);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8}>
        <Box as="form" onSubmit={handleSubmit} width="100%">
          <HStack spacing={4}>
            <FormControl id="date" isRequired>
              <FormLabel>Date</FormLabel>
              <Input type="date" name="date" value={form.date} onChange={handleChange} />
            </FormControl>
            <FormControl id="amount" isRequired>
              <FormLabel>Amount</FormLabel>
              <Input type="number" name="amount" value={form.amount} onChange={handleChange} />
            </FormControl>
            <FormControl id="type" isRequired>
              <FormLabel>Type</FormLabel>
              <Select name="type" value={form.type} onChange={handleChange}>
                <option value="">Select type</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </Select>
            </FormControl>
            <FormControl id="category" isRequired>
              <FormLabel>Category</FormLabel>
              <Select name="category" value={form.category} onChange={handleChange}>
                <option value="">Select category</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
                <option value="Reebok">Reebok</option>
              </Select>
            </FormControl>
          </HStack>
          <Button mt={4} colorScheme="teal" type="submit">
            Add Transaction
          </Button>
        </Box>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Category</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.date}</Td>
                <Td>{transaction.amount}</Td>
                <Td>{transaction.type}</Td>
                <Td>{transaction.category}</Td>
                <Td>
                  <Button size="sm" onClick={() => handleEdit(transaction.id)}>
                    Edit
                  </Button>
                  <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(transaction.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;