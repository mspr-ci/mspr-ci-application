package fr.epsi.mspr.ci;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("fr.epsi.mspr.ci");

        noClasses()
            .that()
                .resideInAnyPackage("fr.epsi.mspr.ci.service..")
            .or()
                .resideInAnyPackage("fr.epsi.mspr.ci.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..fr.epsi.mspr.ci.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
