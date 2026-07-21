export const diffFiles = [
  {
    path: 'src/checkout/cart.py',
    status: 'needs-review',
    hunks: [
      {
        id: 'hunk-1',
        header: '@@ -15,24 +15,22 @@ def calculate_total(items):',
        original: `def calculate_total(items):
    total = 0
    for item in items:
        total += item['price'] * item['quantity']
    return total`,
        migrated: `def calculate_total(items: list[dict]) -> float:
    return sum(item['price'] * item['quantity'] for item in items)`,
        decision: 'pending',
      },
      {
        id: 'hunk-2',
        header: '@@ -45,12 +43,10 @@ class CartManager:',
        original: `class CartManager:
    def __init__(self):
        self.items = []

    def add_item(self, item):
        self.items.append(item)`,
        migrated: `class CartManager:
    def __init__(self) -> None:
        self.items: list[dict] = []

    def add_item(self, item: dict) -> None:
        self.items.append(item)`,
        decision: 'pending',
      },
    ],
  },
  {
    path: 'src/utils/string_utils.py',
    status: 'validated',
    hunks: [
      {
        id: 'hunk-3',
        header: '@@ -1,8 +1,7 @@',
        original: `def format_currency(amount):
    return "$%.2f" % amount`,
        migrated: `def format_currency(amount: float) -> str:
    return f"\${amount:.2f}"`,
        decision: 'pending',
      },
      {
        id: 'hunk-4',
        header: '@@ -10,14 +9,12 @@ def slugify(text):',
        original: `def slugify(text):
    import re
    text = text.lower()
    text = re.sub(r'[^a-z0-9\\s-]', '', text)
    text = re.sub(r'\\s+', '-', text)
    return text.strip('-')`,
        migrated: `def slugify(text: str) -> str:
    import re
    text = text.lower()
    text = re.sub(r'[^a-z0-9\\s-]', '', text)
    return re.sub(r'\\s+', '-', text).strip('-')`,
        decision: 'pending',
      },
    ],
  },
  {
    path: 'src/models/user.py',
    status: 'test-failure',
    hunks: [
      {
        id: 'hunk-5',
        header: '@@ -22,32 +22,28 @@ class User:',
        original: `class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def get_full_name(self):
        return self.name.strip()

    def is_valid(self):
        return '@' in self.email`,
        migrated: `from dataclasses import dataclass

@dataclass
class User:
    name: str
    email: str

    def get_full_name(self) -> str:
        return self.name.strip()

    def is_valid(self) -> bool:
        return '@' in self.email`,
        decision: 'pending',
      },
    ],
  },
  {
    path: 'src/orders/repository.py',
    status: 'needs-review',
    hunks: [
      {
        id: 'hunk-6',
        header: '@@ -50,18 +48,15 @@ def get_orders_by_user(user_id):',
        original: `def get_orders_by_user(user_id):
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM orders WHERE user_id = ?", (user_id,))
    rows = cursor.fetchall()
    conn.close()
    return rows`,
        migrated: `def get_orders_by_user(user_id: int) -> list[dict]:
    import sqlite3
    with sqlite3.connect('db.sqlite3') as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.execute("SELECT * FROM orders WHERE user_id = ?", (user_id,))
        return [dict(row) for row in cursor.fetchall()]`,
        decision: 'pending',
      },
    ],
  },
  {
    path: 'src/config/settings.py',
    status: 'validated',
    hunks: [
      {
        id: 'hunk-7',
        header: '@@ -1,6 +1,6 @@',
        original: `import os

DEBUG = True
DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///db.sqlite3')
SECRET_KEY = 'dev-secret-key'`,
        migrated: `import os
from pathlib import Path

DEBUG: bool = True
DATABASE_URL: str = os.environ.get('DATABASE_URL', f'sqlite:///{Path.home() / "codeshift" / "db.sqlite3"}')
SECRET_KEY: str = os.environ.get('SECRET_KEY', 'dev-secret-key')`,
        decision: 'pending',
      },
    ],
  },
  {
    path: 'src/inventory/stock.py',
    status: 'needs-review',
    hunks: [
      {
        id: 'hunk-8',
        header: '@@ -12,20 +12,18 @@ class StockManager:',
        original: `class StockManager:
    def __init__(self):
        self.stock = {}
        self.low_stock_threshold = 5

    def check_availability(self, sku):
        if sku in self.stock:
            return self.stock[sku] > 0
        return False`,
        migrated: `class StockManager:
    def __init__(self) -> None:
        self.stock: dict[str, int] = {}
        self.low_stock_threshold: int = 5

    def check_availability(self, sku: str) -> bool:
        return self.stock.get(sku, 0) > 0`,
        decision: 'pending',
      },
    ],
  },
  {
    path: 'tests/test_cart.py',
    status: 'validated',
    hunks: [
      {
        id: 'hunk-9',
        header: '@@ -1,15 +1,15 @@',
        original: `import unittest
from checkout.cart import calculate_total

class TestCart(unittest.TestCase):
    def test_empty_cart(self):
        self.assertEqual(calculate_total([]), 0)

    def test_single_item(self):
        items = [{'price': 10, 'quantity': 2}]
        self.assertEqual(calculate_total(items), 20)`,
        migrated: `import pytest
from checkout.cart import calculate_total

class TestCart:
    def test_empty_cart(self) -> None:
        assert calculate_total([]) == 0

    def test_single_item(self) -> None:
        items = [{'price': 10, 'quantity': 2}]
        assert calculate_total(items) == 20`,
        decision: 'pending',
      },
    ],
  },
  {
    path: 'src/payments/gateway.py',
    status: 'test-failure',
    hunks: [
      {
        id: 'hunk-10',
        header: '@@ -30,24 +30,22 @@ def process_payment(card_number, amount):',
        original: `def process_payment(card_number, amount):
    if len(card_number) != 16:
        raise ValueError("Invalid card number")
    if amount <= 0:
        raise ValueError("Amount must be positive")
    print("Processing payment...")
    return {"status": "success", "transaction_id": "txn_" + str(random.randint(1000, 9999))}`,
        migrated: `def process_payment(card_number: str, amount: float) -> dict:
    if len(card_number) != 16:
        raise ValueError("Invalid card number")
    if amount <= 0:
        raise ValueError("Amount must be positive")
    import logging
    logging.info("Processing payment...")
    return {"status": "success", "transaction_id": f"txn_{random.randint(1000, 9999)}"}`,
        decision: 'pending',
      },
    ],
  },
]
