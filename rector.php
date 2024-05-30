<?php
declare(strict_types=1);
use Rector\Config\RectorConfig;
use Rector\TypeDeclaration\Rector\ClassMethod\AddVoidReturnTypeWhereNoReturnRector;
return RectorConfig::configure()
    ->withPaths([
        __DIR__ . '/Controls',
        __DIR__ . '/Domain',
        __DIR__ . '/Jobs',
        __DIR__ . '/Pages',
        __DIR__ . '/Presenters',
        __DIR__ . '/Web',
        __DIR__ . '/WebServices',
        __DIR__ . '/config',
        __DIR__ . '/lang',
        __DIR__ . '/lib',
        __DIR__ . '/phing-tasks',
        __DIR__ . '/plugins',
        __DIR__ . '/tests',
    ])
    // uncomment to reach your current PHP version
    // ->withPhpSets()
    ->withRules([
        AddVoidReturnTypeWhereNoReturnRector::class,
    ]);
