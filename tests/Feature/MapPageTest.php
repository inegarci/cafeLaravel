<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class MapPageTest extends TestCase
{
    public function test_guests_can_view_the_map_page(): void
    {
        $response = $this->get('/map');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('mapa')
        );
    }
}
