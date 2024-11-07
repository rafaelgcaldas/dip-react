import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { UserItem } from '.';
import type { User } from '../../../domain/models';
import { createRandomUser } from '../../../infra/test';
import { describe, expect, it } from 'vitest';

describe('UserItem', () => {
  it('should be able to render correctly', () => {
    const userMock: User = createRandomUser();
    const wrapper = render(<UserItem user={userMock} />)

    expect(wrapper.getByText(userMock.name)).toBeVisible()
  })
})