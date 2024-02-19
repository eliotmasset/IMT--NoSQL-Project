import Address from '../models/Address.ts';

interface IAddressRepository {
    create(id: number, street: string, city: string, postalCode: string): Address;

    find(id: number): Address | null;
}

export default IAddressRepository;
