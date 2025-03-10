import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { getAllRestaurants, deleteRestaurant } from '../../../services/restaurants';

const AdminRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 10;

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const restaurantData = await getAllRestaurants();
      setRestaurants(restaurantData);
      setLoading(false);
    } catch (error) {
      setError('Error fetching restaurants');
      console.error("Error fetching restaurants", error);
      setLoading(false);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      await deleteRestaurant(id);
      setRestaurants((restaurants) => restaurants.filter(restaurant => restaurant.id !== id));
      setAlertMessage('Restaurant deleted successfully.');
      setAlertVariant('success');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      setError('Error deleting restaurant');
      console.error("There was an error deleting the restaurant!", error);
    }
  };

  // Search
  const filteredRestaurants = restaurants.filter(restaurant => {
    const nameMatch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const locationMatch = restaurant.location.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || locationMatch;
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurnats = filteredRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
  const totalPages = Math.ceil(filteredRestaurants.length / restaurantsPerPage);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container>
      {showAlert && <Alert variant={alertVariant}>{alertMessage}</Alert>}
      {error && <p className="alert alert-danger">{error}</p>}
      <Row className="py-4">
        <Col>
          <Form className="mb-3" onSubmit={handleSearchSubmit}>
            <Form.Control
              type="search"
              placeholder="Search by Name and Location"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form>

          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>Client</th>
                <th>Name</th>
                <th>Style</th>
                <th>Location</th>
                <th>Cost</th>
                <th>Reviews</th>
                <th>Overall Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRestaurnats.map((restaurant, index) => (
                <tr key={restaurant.id}>
                  <td>{index+1}</td>
                  <td>{restaurant.id}</td>
                  <td>{restaurant.clientName}</td>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.style}</td>
                  <td>{restaurant.location}</td>
                  <td>{restaurant.cost}</td>
                  <td>{restaurant.totalReviews}</td>
                  <td>{restaurant.overallRating.toFixed(1)}</td>
                  <td>
                    <Link className="btn btn-dark mx-2" to={`/viewrestaurant/${restaurant.id}`}>
                      <i className="fas fa-eye"></i> View
                    </Link>
                    <Button variant="danger" className="mx-2" onClick={() => handleDeleteRestaurant(restaurant.id)}>
                      <i className="fas fa-trash-alt"></i> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center pagination-dark">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>

        </Col>
      </Row>
    </Container>
  );
}

export default AdminRestaurant;