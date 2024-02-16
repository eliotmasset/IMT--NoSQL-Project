# IMT--NoSQL-Project

user
- id
- username
- password
- creation_date

follow
- id
- user
- user
- creation_date

post
- id
- user
- content
- creation_date

like
- id
- user
- post
- creation_date

dislike
- id
- user
- post
- creation_date

product
- id
- name
- barcode
- price

billing_address
- id
- user
- address

address
- id
- street
- city
- postal_code

order
- id
- user
- shipping_address
- creation_date

order_item
- id
- order
- product
- price
