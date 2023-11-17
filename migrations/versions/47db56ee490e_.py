"""empty message

Revision ID: 47db56ee490e
Revises: 41edb9b422b5
Create Date: 2023-11-17 20:06:33.315329

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '47db56ee490e'
down_revision = '41edb9b422b5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('task', schema=None) as batch_op:
        batch_op.alter_column('reward_link',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('reward_duration',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('task', schema=None) as batch_op:
        batch_op.alter_column('reward_duration',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('reward_link',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###