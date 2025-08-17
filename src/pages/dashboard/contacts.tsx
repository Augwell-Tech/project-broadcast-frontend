import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell, 
  Button, 
  Input, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Chip,
  Pagination,
  Select,
  SelectItem
} from '@nextui-org/react';
import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
  company: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  tags: string[];
  status: 'active' | 'inactive' | 'unsubscribed';
  createdAt: string;
  lastContacted?: string;
}

const Contacts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data - replace with actual API calls
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Tech Corp',
      tags: ['VIP', 'Enterprise'],
      status: 'active',
      createdAt: '2024-01-15',
      lastContacted: '2024-01-20',
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      company: 'Design Studio',
      tags: ['Designer', 'Freelancer'],
      status: 'active',
      createdAt: '2024-01-10',
      lastContacted: '2024-01-18',
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 (555) 456-7890',
      company: 'Marketing Agency',
      tags: ['Marketing', 'Agency'],
      status: 'inactive',
      createdAt: '2024-01-05',
      lastContacted: '2024-01-12',
    },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Filter and paginate contacts
  const filteredContacts = useMemo(() => {
    let filtered = contacts.filter(contact => {
      const matchesSearch = 
        contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.company?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    return filtered;
  }, [contacts, searchQuery, statusFilter]);

  const paginatedContacts = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredContacts.slice(start, end);
  }, [filteredContacts, page, rowsPerPage]);

  const pages = Math.ceil(filteredContacts.length / rowsPerPage);

  const handleAddContact = () => {
    setIsEditMode(false);
    setSelectedContact(null);
    reset();
    onOpen();
  };

  const handleEditContact = (contact: Contact) => {
    setIsEditMode(true);
    setSelectedContact(contact);
    setValue('firstName', contact.firstName);
    setValue('lastName', contact.lastName);
    setValue('email', contact.email);
    setValue('phone', contact.phone);
    setValue('company', contact.company || '');
    setValue('tags', contact.tags);
    onOpen();
  };

  const handleDeleteContact = (contactId: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(c => c.id !== contactId));
      toast.success('Contact deleted successfully');
    }
  };

  const onSubmit = (data: ContactFormData) => {
    if (isEditMode && selectedContact) {
      // Edit existing contact
      setContacts(contacts.map(c => 
        c.id === selectedContact.id 
          ? { ...c, ...data, updatedAt: new Date().toISOString() }
          : c
      ));
      toast.success('Contact updated successfully');
    } else {
      // Add new contact
      const newContact: Contact = {
        id: Date.now().toString(),
        ...data,
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      setContacts([...contacts, newContact]);
      toast.success('Contact added successfully');
    }
    
    onClose();
    reset();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'unsubscribed':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
          <p className="text-slate-600">Manage your contact list and audience</p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="bordered"
            startContent={<Icon icon="mdi:upload" className="w-4 h-4" />}
            className="border-slate-300 text-slate-700"
          >
            Import
          </Button>
          <Button
            color="primary"
            startContent={<Icon icon="mdi:plus" className="w-4 h-4" />}
            onClick={handleAddContact}
          >
            Add Contact
          </Button>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Input
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<Icon icon="mdi:magnify" className="w-4 h-4 text-slate-400" />}
          className="sm:w-80"
        />
        
        <Select
          placeholder="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="sm:w-48"
        >
          <SelectItem key="all" value="all">All Status</SelectItem>
          <SelectItem key="active" value="active">Active</SelectItem>
          <SelectItem key="inactive" value="inactive">Inactive</SelectItem>
          <SelectItem key="unsubscribed" value="unsubscribed">Unsubscribed</SelectItem>
        </Select>
      </motion.div>

      {/* Contacts Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border border-slate-200">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold text-slate-900">
                Contact List ({filteredContacts.length} contacts)
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>Rows per page:</span>
                <Select
                  size="sm"
                  value={rowsPerPage.toString()}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className="w-20"
                >
                  <SelectItem key="5" value="5">5</SelectItem>
                  <SelectItem key="10" value="10">10</SelectItem>
                  <SelectItem key="25" value="25">25</SelectItem>
                  <SelectItem key="50" value="50">50</SelectItem>
                </Select>
              </div>
            </div>
          </CardHeader>
          
          <CardBody>
            <Table aria-label="Contacts table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>PHONE</TableColumn>
                <TableColumn>COMPANY</TableColumn>
                <TableColumn>TAGS</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No contacts found">
                {paginatedContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">
                          {contact.firstName} {contact.lastName}
                        </div>
                        <div className="text-sm text-slate-500">
                          Added {new Date(contact.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-slate-900">{contact.email}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-slate-900">{contact.phone}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-slate-900">{contact.company || '-'}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag, index) => (
                          <Chip key={index} size="sm" variant="flat" className="text-xs">
                            {tag}
                          </Chip>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="sm"
                        color={getStatusColor(contact.status)}
                        variant="flat"
                      >
                        {contact.status}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            className="text-slate-400 hover:text-slate-600"
                          >
                            <Icon icon="mdi:dots-vertical" className="w-4 h-4" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Contact actions">
                          <DropdownItem
                            key="edit"
                            startContent={<Icon icon="mdi:pencil" className="w-4 h-4" />}
                            onClick={() => handleEditContact(contact)}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            key="delete"
                            color="danger"
                            startContent={<Icon icon="mdi:delete" className="w-4 h-4" />}
                            onClick={() => handleDeleteContact(contact.id)}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {/* Pagination */}
            {pages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination
                  total={pages}
                  page={page}
                  onChange={setPage}
                  showControls
                  color="primary"
                />
              </div>
            )}
          </CardBody>
        </Card>
      </motion.div>

      {/* Add/Edit Contact Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-semibold">
              {isEditMode ? 'Edit Contact' : 'Add New Contact'}
            </h3>
          </ModalHeader>
          
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  {...register('firstName')}
                  label="First Name"
                  placeholder="Enter first name"
                  variant="bordered"
                  isInvalid={!!errors.firstName}
                  errorMessage={errors.firstName?.message}
                />
                
                <Input
                  {...register('lastName')}
                  label="Last Name"
                  placeholder="Enter last name"
                  variant="bordered"
                  isInvalid={!!errors.lastName}
                  errorMessage={errors.lastName?.message}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  {...register('email')}
                  label="Email"
                  type="email"
                  placeholder="Enter email address"
                  variant="bordered"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
                
                <Input
                  {...register('phone')}
                  label="Phone"
                  placeholder="Enter phone number"
                  variant="bordered"
                  isInvalid={!!errors.phone}
                  errorMessage={errors.phone?.message}
                />
              </div>
              
              <Input
                {...register('company')}
                label="Company"
                placeholder="Enter company name (optional)"
                variant="bordered"
              />
              
              <Input
                label="Tags"
                placeholder="Enter tags separated by commas"
                variant="bordered"
                description="Tags help organize and segment your contacts"
              />
            </form>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="bordered" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSubmit(onSubmit)}>
              {isEditMode ? 'Update Contact' : 'Add Contact'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Contacts;
