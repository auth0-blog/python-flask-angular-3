"""add long_description to exams

Revision ID: 28bab18a07f0
Revises: 
Create Date: 2018-03-23 08:57:02.884415

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '28bab18a07f0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('exams', sa.Column('long_description', sa.Text))


def downgrade():
    pass
