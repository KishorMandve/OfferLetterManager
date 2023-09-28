"use client"
import { useAuth } from "@/Context/AuthContext";
import { signInWithEmail } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Loading } from "../components/Loading";
import './page.css';

export default () => {

  const [loading, setLoading] = useState(true)

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [user])


  const handleSubmit = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    let email = emailRef.current?.value;
    let password = passwordRef.current?.value;
    signInWithEmail(email ? email : "", password ? password : "")
      .then(() => router.push("/"));
  }

  return (
    <>
      {loading ? <Loading /> : (
        <Container id="login-container" fluid>
          <Row>
            <Col md={4}>
              <Card style={{ maxWidth: '400px' }}>
                <Card.Body>
                  <Card.Title className="text-center">
                    <img src="/brand.png" height={40} />
                  </Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email" className="mb-2">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} />
                    </Form.Group>

                    <Form.Group controlId="password" className="mb-2">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" ref={passwordRef} />
                      <div className="d-flex justify-content-end mt-1">
                        <a href="/forgot-password">Forgot Password?</a>
                      </div>
                    </Form.Group>

                    <Button type="submit" variant="brand" className="w-100 mt-2 mb-2">
                      Login
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}